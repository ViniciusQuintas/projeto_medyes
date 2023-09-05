<template>
  <div>
    <h1>Lista de Secretários(as)</h1>

    <ul>
      <li v-for="secretario in secretarios" :key="secretario.id">
        Nome: {{ secretario.nome }} - Data de Admissão: {{ secretario.data_admissao }}
        <button @click="excluirSecretario(secretario.id)" class="excluir">Excluir</button>
      </li>
    </ul>


      <h3>Novo Secretário(a)</h3>
      <form @submit.prevent="criarSecretario">
        <div>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" placeholder="Nome..." v-model="novoSecretario.nome" required>
      </div>
      <div>
          <label for="data_admissao">Data de Admissão:</label>
          <input type="date" id="data_admissao" v-model="novoSecretario.data_admissao" required>
      </div>

        <button type="submit">Salvar</button>
      </form>


  </div>
</template>

<script>
export default {
  data() {
    return {
      secretarios: [],
      novoSecretario: {
        nome: '',
        data_admissao: '',
      },
    };
  },
  methods: {
    async criarSecretario() {
      try {
        const response = await fetch('http://localhost:3333/api/secretario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.novoSecretario),
        });
        if (response.ok) {
          this.secretarios.push(await response.json());
          this.mostrarNovoSecretario = false;
          this.novoSecretario = {
            nome: '',
            data_admissao: '',
          };
        } else {
          console.error('Erro ao criar secretário(a)');
        }
      } catch (error) {
        console.error('Erro ao criar secretário(a):', error);
      }
    },
    async excluirSecretario(id) {
      try {
        const response = await fetch(`http://localhost:3333/api/secretario/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          this.secretarios = this.secretarios.filter((item) => item.id !== id);
        } else {
          console.error('Erro ao excluir secretário(a)');
        }
      } catch (error) {
        console.error('Erro ao excluir secretário(a):', error);
      }
    },
    async carregarSecretarios() {
      try {
        const response = await fetch('http://localhost:3333/api/secretario');
        if (response.ok) {
          this.secretarios = await response.json();
        } else {
          console.error('Erro ao buscar secretários(as)');
        }
      } catch (error) {
        console.error('Erro ao buscar secretários(as):', error);
      }
    },
  },
  mounted() {
    this.carregarSecretarios();
  },
};
</script>
