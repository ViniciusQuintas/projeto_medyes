'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=> {
  Route.post('/medicos', 'MedicoController.create')
  Route.get('/medicos', 'MedicoController.index')
  Route.get('/medicos/:id', 'MedicoController.show')
  Route.put('/medicos/:id', 'MedicoController.update')
  Route.delete('/medicos/:id', 'MedicoController.destroy')
}).prefix('api')

Route.group(()=> {
  Route.post('/paciente', 'PacienteController.create')
  Route.get('/paciente', 'PacienteController.index')
  Route.get('/paciente/:id', 'PacienteController.show')
  Route.put('/paciente/:id', 'PacienteController.update')
  Route.delete('/paciente/:id', 'PacienteController.destroy')
}).prefix('api')

Route.group(()=> {
  Route.post('/secretario', 'SecretarioController.create')
  Route.get('/secretario', 'SecretarioController.index')
  Route.get('/secretario/:id', 'SecretarioController.show')
  Route.put('/secretario/:id', 'SecretarioController.update')
  Route.delete('/secretario/:id', 'SecretarioController.destroy')
}).prefix('api')

Route.group(()=> {
  Route.post('/atendimento', 'AtendimentoController.create')
  Route.get('/atendimento', 'AtendimentoController.index')
  Route.get('/atendimento/:id', 'AtendimentoController.show')
  Route.put('/atendimento/:id', 'AtendimentoController.update')
  Route.delete('/atendimento/:id', 'AtendimentoController.destroy')
}).prefix('api')

