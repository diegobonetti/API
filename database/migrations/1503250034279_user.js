'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.timestamps()
      table.string('rg', 10).notNullable().unique() // email for login
      table.string('cpf', 11).notNullable().unique() 
      table.string('password', 60).notNullable()
      table.string('name', 60).notNullable()
      table.string('lastName', 60).notNullable()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
