'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {

    static boot(){
        super.boot();
    }

    user(){
        return this.hasOne('App/Models/User')
    }
    address(){
        return this.hasOne('App/Models/Address')
    }

}

module.exports = Customer
