<template>
  <div>
    <header>
      <h2>MedYes</h2>
      <nav>
      <router-link to="/medicos">Médicos</router-link>
      <router-link to="/pacientes">Pacientes</router-link>
      <router-link to="/secretarios">Secretários</router-link>
      <router-link to="/atendimentos">Atendimentos</router-link>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>
  </div>
</template>

<script>
import './style/style.css'

export default {
  name: 'App',
  components: {

  }
}
</script>
