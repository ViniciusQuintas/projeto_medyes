<template>
  <div>
    <h1>Lista de Médicos</h1>
    <ul>
      <li v-for="medico in medicos" :key="medico.id">
        Nome: {{ medico.nome }} - Registro: {{ medico.registro }}
        <button @click="excluirMedico(medico.id)" class="excluir">Excluir</button>
      </li>
    </ul>

    <h3>Novo Médico</h3>
    <form @submit.prevent="criarMedico">
      <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="novoMedico.nome" placeholder="Nome..." required>
      </div>
      <div>
        <label for="registro">Registro:</label>
      <input type="text" id="registro" v-model="novoMedico.registro" placeholder="Registro" required>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      medicos: [],
      novoMedico: {
        nome: '',
        registro: '',
      },
    };
  },
  mounted() {
    this.buscarMedicos();
  },
  methods: {
    buscarMedicos() {
      fetch('http://localhost:3333/api/medicos')
        .then((response) => response.json())
        .then((data) => {
          this.medicos = data;
        })
        .catch((error) => {
          console.error('Erro ao buscar médicos:', error);
        });
    },
    criarMedico() {
  fetch('http://localhost:3333/api/medicos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.novoMedico),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao cadastrar médico');
      }
      return response.json();
    })
    .then((data) => {
      this.medicos.push(data);
      this.novoMedico = {
        nome: '',
        registro: '',
      };
    })
    .catch((error) => {
      console.error('Erro ao cadastrar médico:', error);
    });
},
    excluirMedico(id) {
      fetch(`http://localhost:3333/api/medicos/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          
          this.medicos = this.medicos.filter((medico) => medico.id !== id);
        })
        .catch((error) => {
          console.error('Erro ao excluir médico:', error);
        });
    },
  },
};
</script>

<style>

</style>
