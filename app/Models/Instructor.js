'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Instructor extends Model {

    activity() {
        return this
            .belongsToMany('App/Models/Activity', 'instructor_id', 'activity_id')
            .pivotTable('instructor_activities')
    }

    class() {
        return this
            .hasMany('App/Models/Class')       
    }

    user(){
        return this.belongsTo('App/Models/User')
    }



}

module.exports = Instructor
