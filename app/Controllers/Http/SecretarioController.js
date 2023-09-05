'use strict'

const Secretario = use('App/Models/Secretario')

class SecretarioController {
  async create({ request, response }) {
    try {
      const data = request.only(['nome', 'data_admissao'])
      const secretario = await Secretario.create(data)
      return secretario
    } catch (error) {
      return response.status(500).send({ message: 'Error ao criar secretario' })
    }
  }

  async index({ response }) {
    try {
      const secretarios = await Secretario.all()
      return secretarios
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao buscar secretarios' })
    }
  }

  async show({ params, response }) {
    try {
      const secretario = await Secretario.find(params.id)
      if (!secretario) {
        return response.status(404).send({ message: 'Secretario não encontrado' })
      }
      return secretario
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao buscar secretários' })
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only(['nome', 'data_admissao'])
      const secretario = await Secretario.find(params.id)
      if (!secretario) {
        return response.status(404).send({ message: 'Secretario não encontrado' })
      }
      secretario.merge(data)
      await secretario.save()
      return secretario
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao atualizar secretário' })
    }
  }

  async destroy({ params, response }) {
    try {
      const secretario = await Secretario.find(params.id)
      if (!secretario) {
        return response.status(404).send({ message: 'Secretario não encontrado' })
      }
      await secretario.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(500).send({ message: 'Erro ao deletar secretario' })
    }
  }
}

module.exports = SecretarioController
