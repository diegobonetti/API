'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassSchema extends Schema {
  up () {
    this.create('classes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('start_time').notNullable()
      table.integer('end_time').notNullable()
      table.string('days_of_week', 7).notNullable()
      table.string('room', 60).notNullable()
      table.integer('instructor_id').unsigned().references('id').inTable('instructors').onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('classes')
  }
}

module.exports = ClassSchema
