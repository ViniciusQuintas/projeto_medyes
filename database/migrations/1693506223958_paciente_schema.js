'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PacienteSchema extends Schema {
  up () {
    this.create('pacientes', (table) => {
      table.increments()
      table.string('nome').notNullable()
      table.string('numero_carteira').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('pacientes')
  }
}

module.exports = PacienteSchema
