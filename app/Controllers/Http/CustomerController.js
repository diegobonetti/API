'use strict'

const User = use('App/Models/User')
const UserUtils = use('App/Utils/UserUtils')

const Address = use('App/Models/Address')
const Customer = use('App/Models/Customer')

const Database = use('Database')

class CustomerController {

    async create({request}){

        const trx = await Database.beginTransaction();

        const userUtils = new UserUtils();
        let user = await userUtils.register(request, trx);

        const addressData = request.only(['city', 'street', 'neightboor', 'zip', 'number', 'complement'])
        const address = await Address.create(addressData, trx);

        const customer = await Customer.create({registration: 999, address_id: address.id, user_id: user.id}, trx);
        customer.registration = customer.id + 1000;

        customer.save();

        trx.commit();

        return customer;
    }

    async update({request}){
        const userData = request.only(['name', 'lastName', 'id']);
        const addressData = request.only(['city', 'street', 'neightboor', 'number', 'zip', 'complement']);
       
        const user = await User
            .find(userData.id);

        const customer = await Database
            .table('customers')
            .where('user_id', userData.id)
            .first()

        // outra forma de buscar: .findOrCreate({ name: name })

        const address = await Address
            .find(customer.address_id);
        

        address.city = addressData.city;
        address.street = addressData.street;
        address.neightboor = addressData.neightboor;
        address.number = addressData.number;
        address.zip = addressData.zip;
        address.complement = addressData.complement;
        
        user.name = userData.name;
        user.lastName = userData.lastName;

        await address.save();
        await user.save();

        return customer.address_id;

    }

    
    async readOne({params}){
        return await User
            .query()
            .innerJoin('customers', 'users.id', 'customers.user_id')
            .innerJoin('addresses', 'customers.address_id', 'addresses.id')
            .from('users').where('users.id', params.id)
            .fetch();
    }


    async readAll({request}){
        return await User
            .query()
            .innerJoin('customers', 'users.id', 'customers.user_id')
            .with('customer')
            .fetch();
    }

    async remove({params}){
        const { id } = params;
        
        const customer = await Database
            .table('customers')
            .where('user_id', id)
            .first()

        const address = await Address
            .find(customer.address_id);

        const user = await User.find(id);
        await address.delete();
        await user.delete();
    }

    /*
    const userdata = await User.query()
  .where('id', auth.user.id)
  .with('group', (query) => {
           query.select('*')
   }) .first() 
   */
}

module.exports = CustomerController
