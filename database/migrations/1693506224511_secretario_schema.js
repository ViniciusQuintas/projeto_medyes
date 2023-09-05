'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SecretarioSchema extends Schema {
  up () {
    this.create('secretarios', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.date('data_admissao')
      table.timestamps()
    })
  }

  down () {
    this.drop('secretarios')
  }
}

module.exports = SecretarioSchema
