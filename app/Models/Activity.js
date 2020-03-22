'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Activity extends Model {

    static get hidden () {
        return ['pivot']
    }

    instructor () {
        return this
            .belongsToMany('App/Models/Instructor', 'activity_id', 'instructor_id')
            .pivotTable('instructor_activities')
    }

}

module.exports = Activity
