'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AtendimentoSchema extends Schema {
  up () {
    this.create('atendimentos', (table) => {
      table.increments()
      table.integer('medico_id').unsigned().references('id').inTable('medicos')
      table.integer('paciente_id').unsigned().references('id').inTable('pacientes')
      table.date('data_entrada').notNullable()
      table.date('data_saida')
      table.text('notas')
      table.timestamps()
    })
  }

  down () {
    this.drop('atendimentos')
  }
}

module.exports = AtendimentoSchema
