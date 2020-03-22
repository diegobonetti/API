'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.timestamps()
      table.string('registration', 10).notNullable()
      table.integer('address_id').unsigned().references('id').inTable('addresses')
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
