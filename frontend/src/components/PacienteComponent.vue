<template>
  <div>
    <h1>Lista de Pacientes</h1>

    <ul>
      <li v-for="paciente in pacientes" :key="paciente.id">
        {{ paciente.nome }} (Número da Carteira: {{ paciente.numero_carteira }})
        <button class="excluir" @click="excluirPaciente(paciente.id)">Excluir</button>
      </li>
    </ul>

    <div>
      <h3>Novo Paciente</h3>
      <form @submit.prevent="criarPaciente">
        <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" placeholder="Nome..." v-model="novoPaciente.nome" required>
      </div>
      <div>
        <label for="numero_carteira">Número da Carteira:</label>
        <input type="text" id="numero_carteira" placeholder="Número da Carteira..." v-model="novoPaciente.numero_carteira" required>
      </div>
        <button type="submit">Salvar</button>
      </form>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      pacientes: [],
      novoPaciente: {
        nome: '',
        numero_carteira: '',
      },
      mostrarFormulario: false,
    };
  },
  methods: {
    async criarPaciente() {
      try {
        const response = await fetch('http://localhost:3333/api/paciente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.novoPaciente),
        });

        if (response.ok) {
          const paciente = await response.json();
          this.pacientes.push(paciente);
          this.mostrarFormulario = false;
          this.novoPaciente = {
            nome: '',
            numero_carteira: '',
          };
        } else {
          console.error('Erro ao criar paciente');
        }
      } catch (error) {
        console.error('Erro ao criar paciente:', error);
      }
    },

    async excluirPaciente(id) {
      try {
        const response = await fetch(`http://localhost:3333/api/paciente/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.pacientes = this.pacientes.filter((paciente) => paciente.id !== id);
        } else {
          console.error('Erro ao excluir paciente');
        }
      } catch (error) {
        console.error('Erro ao excluir paciente:', error);
      }
    },


    async carregarPacientes() {
      try {
        const response = await fetch('http://localhost:3333/api/paciente');
        if (response.ok) {
          this.pacientes = await response.json();
        } else {
          console.error('Erro ao carregar pacientes');
        }
      } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
      }
    },
  },

  mounted() {
    this.carregarPacientes(); 
  },
};
</script>
