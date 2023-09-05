'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MedicoSchema extends Schema {
  up () {
    this.create('medicos', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('registro').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('medicos')
  }
}

module.exports = MedicoSchema
