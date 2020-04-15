'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstructorSchema extends Schema {
  up () {
    this.create('instructors', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('instructors')
  }
}

module.exports = InstructorSchema
