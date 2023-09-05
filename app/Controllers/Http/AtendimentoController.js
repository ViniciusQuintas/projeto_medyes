'use strict'

const Atendimento = use('App/Models/Atendimento')

class AtendimentoController {
  async create({ request, response }) {
    try {
      const data = request.only(['medico_id', 'paciente_id', 'data_entrada', 'data_saida', 'notas'])
      const atendimento = await Atendimento.create(data)
      return atendimento
    } catch (error) {
      return response.status(500).send({ message: 'Error ao criar atendimento' })
    }
  }

  async index({ response }) {
    try {
      const atendimentos = await Atendimento.all()
      return atendimentos
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao buscar atendimento' })
    }
  }

  async show({ params, response }) {
    try {
      const atendimento = await Atendimento.find(params.id)
      if (!atendimento) {
        return response.status(404).send({ message: 'Atendimento não encontrado' })
      }
      return atendimento
    } catch (error) {
      return response.status(500).send({ message: 'Error ao buscar atendimento' })
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only(['medico_id', 'paciente_id', 'data_entrada', 'data_saida', 'notas'])
      const atendimento = await Atendimento.find(params.id)
      if (!atendimento) {
        return response.status(404).send({ message: 'Atendimento não encontrado' })
      }
      atendimento.merge(data)
      await atendimento.save()
      return atendimento
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao atualizar o atendimento' })
    }
  }

  async destroy({ params, response }) {
    try {
      const atendimento = await Atendimento.find(params.id)
      if (!atendimento) {
        return response.status(404).send({ message: 'Atendimento não encontrado' })
      }
      await atendimento.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao deletar atendimento' })
    }
  }
}

module.exports = AtendimentoController
