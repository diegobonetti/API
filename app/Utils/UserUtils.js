
const User = use('App/Models/User')

module.exports = class UserUtils{
    
    async register(request, trx){
        let userData = request.only(['rg', 'cpf', 'name', 'lastName'])
        userData.password="none";
        const user = await User.create(userData, trx);
        return user; 
    }
}
