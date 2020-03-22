'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Instructor extends Model {

    activity() {
        return this
            .belongsToMany('App/Models/Activity', 'instructor_id', 'activity_id')
            .pivotTable('instructor_activities')
    }

    instructor() {
        return this
            .belongsToOne('App/Models/Instructor', 'id', 'instructor_id')
            
    }

}

module.exports = Instructor
