'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.timestamps()
      table.string('city', 100).notNullable()
      table.string('street', 100).notNullable()
      table.string('neightboor', 100).notNullable()
      table.string('zip', 8).notNullable()
      table.bigInteger('number').notNullable()
      table.string('complement', 100).notNullable()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
