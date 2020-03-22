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

        const customerData = request.only(['registration']);
        const customer = await Customer.create({...customerData, address_id: address.id, user_id: user.id}, trx);

        trx.commit();

        return customer;
    }

    async readAll({request}){
        return await User.query().with('customer').fetch();
    }
}

module.exports = CustomerController
