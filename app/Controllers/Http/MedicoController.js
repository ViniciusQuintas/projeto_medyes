'use strict'

const Medico = use('App/Models/Medico')

class MedicoController {
  async create({ request, response }) {
    try {
      const data = request.only(['nome', 'registro'])
      const medico = await Medico.create(data)
      return medico
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao cadastrar médico' })
    }
  }

  async index({ response }) {
    try {
      const medicos = await Medico.all()
      return medicos
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao buscar médico' })
    }
  }

  async show({ params, response }) {
    try {
      const medico = await Medico.find(params.id)
      if (!medico) {
        return response.status(404).send({ message: 'Medico não encontrado' })
      }
      return medico
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao buscar médico' })
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only(['nome', 'registro'])
      const medico = await Medico.find(params.id)
      if (!medico) {
        return response.status(404).send({ message: 'Medico não encontrado' })
      }
      medico.merge(data)
      await medico.save()
      return medico
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao atualizar médico' })
    }
  }

  async destroy({ params, response }) {
    try {
      const medico = await Medico.find(params.id)
      if (!medico) {
        return response.status(404).send({ message: 'Medico não encontrado' })
      }
      await medico.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao deletar médico' })
    }
  }
}
module.exports = MedicoController
