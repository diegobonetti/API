'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Class extends Model {

    instructor(){
        return this.hasOne('App/Models/Instructor');
    }

}

module.exports = Class
