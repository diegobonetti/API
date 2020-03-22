'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstructorActivitySchema extends Schema {
  up () {
    this.create('instructor_activities', (table) => {
      table.increments()
      table.timestamps()
      table.integer('instructor_id').unsigned().references('id').inTable('instructors')
      table.integer('activity_id').unsigned().references('id').inTable('activities')
    })
  }

  down () {
    this.drop('instructor_activities')
  }
}

module.exports = InstructorActivitySchema
