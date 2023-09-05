'use strict'

const Paciente = use('App/Models/Paciente')

class PacienteController {
  async create({ request, response }) {
    try {
      const data = request.only(['nome', 'numero_carteira'])
      const paciente = await Paciente.create(data)
      return paciente
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao criar paciente' })
    }
  }

  async index({ response }) {
    try {
      const pacientes = await Paciente.all()
      return pacientes
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao buscar pacientes' })
    }
  }

  async show({ params, response }) {
    try {
      const paciente = await Paciente.find(params.id)
      if (!paciente) {
        return response.status(404).send({ message: 'Paciente não encontrado' })
      }
      return paciente
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao buscar paciente' })
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only(['nome', 'numero_carteira'])
      const paciente = await Paciente.find(params.id)
      if (!paciente) {
        return response.status(404).send({ message: 'paciente não encontrado' })
      }
      paciente.merge(data)
      await paciente.save()
      return paciente
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao atualizar paciente' })
    }
  }

  async destroy({ params, response }) {
    try {
      const paciente = await Paciente.find(params.id)
      if (!paciente) {
        return response.status(404).send({ message: 'Paciente não encontrado' })
      }
      await paciente.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao deletar paciente' })
    }
  }
}

module.exports = PacienteController
