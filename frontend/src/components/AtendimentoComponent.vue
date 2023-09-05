<template>
  <div>
    <h1>Lista de Atendimentos</h1>

    <ul><li v-for="atendimento in atendimentos" :key="atendimento.id">
      Médico: {{ nomeMedico(atendimento.medico_id) }} - Paciente: {{ nomePaciente(atendimento.paciente_id) }}
      - Entrada: {{ atendimento.data_entrada }} - Saída: {{ atendimento.data_saida }} - Notas: {{ atendimento.notas }}
      <button @click="editarAtendimento(atendimento)" class="editar">Editar</button>
      <button @click="excluirAtendimento(atendimento.id)" class="excluir">Excluir</button>
    </li>
  </ul>

    <div>
      <h3>{{ editarAtendimentoId ? 'Editar Atendimento' : 'Novo Atendimento' }}</h3>
      <form @submit.prevent="editarAtendimentoId ? atualizarAtendimento() : criarAtendimento()">

      <div>
        <label for="medico_id">Médico:</label>
        <select id="medico_id" v-model="novoAtendimento.medico_id" required>
          <option v-for="medico in medicos" :key="medico.id" :value="medico.id">{{ medico.nome }}</option>
        </select>
      </div>

      <div>
        <label for="paciente_id">Paciente:</label>
        <select id="paciente_id" v-model="novoAtendimento.paciente_id" required>
          <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">{{ paciente.nome }}</option>
        </select>
      </div>

      <div>
        <label for="data_entrada">Data de Entrada:</label>
        <input type="date" id="data_entrada" v-model="novoAtendimento.data_entrada" required>
      </div>

      <div>
        <label for="data_saida">Data de Saída:</label>
        <input type="date" id="data_saida" v-model="novoAtendimento.data_saida" required>
      </div>

      <div>
        <label for="notas">Notas:</label>
        <textarea id="notas" placeholder="Adicione uma nota..." v-model="novoAtendimento.notas"></textarea>
      </div>

        <button type="submit">{{ editarAtendimentoId ? 'Atualizar' : 'Salvar' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      atendimentos: [],
      pacientes: [],
      medicos: [],
      novoAtendimento: {
        medico_id: null,
        paciente_id: null,
        data_entrada: '',
        data_saida: '',
        notas: '',
        medico_nome: '',
        paciente_nome: '',
      },
      editarAtendimentoId: null,
    };
  },
  computed: {
    nomeMedico() {
      return (id) => {
        const medico = this.medicos.find((m) => m.id === id);
        return medico ? medico.nome : '';
      };
    },

    nomePaciente() {
      return (id) => {
        const paciente = this.pacientes.find((p) => p.id === id);
        return paciente ? paciente.nome : '';
      };
    },
  },

  methods: {
    async buscarNomeMedico(id) {
      const medico = this.medicos.find((m) => m.id === id);
      return medico ? medico.nome : '';
    },
    async buscarNomePaciente(id) {
      const paciente = this.pacientes.find((p) => p.id === id);
      return paciente ? paciente.nome : '';
    },
    async criarAtendimento() {
      try {
        const nomeMedico = await this.buscarNomeMedico(this.novoAtendimento.medico_id);
        const nomePaciente = await this.buscarNomePaciente(this.novoAtendimento.paciente_id);

        this.novoAtendimento.medico_nome = nomeMedico;
        this.novoAtendimento.paciente_nome = nomePaciente;

        const response = await fetch('http://localhost:3333/api/atendimento', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.novoAtendimento),
        });

        if (response.ok) {
          const atendimento = await response.json();
          this.atendimentos.push(atendimento);
          this.novoAtendimento = {
            medico_id: null,
            paciente_id: null,
            data_entrada: '',
            data_saida: '',
            notas: '',
            medico_nome: '',
            paciente_nome: '',
          };
        } else {
          console.error('Erro ao criar atendimento');
        }
      } catch (error) {
        console.error('Erro ao criar atendimento:', error);
      }
    },

    async editarAtendimento(atendimento) {
      this.editarAtendimentoId = atendimento.id;
      this.novoAtendimento = {
        medico_id: atendimento.medico_id,
        paciente_id: atendimento.paciente_id,
        data_entrada: atendimento.data_entrada,
        data_saida: atendimento.data_saida,
        notas: atendimento.notas,
        medico_nome: await this.buscarNomeMedico(atendimento.medico_id),
        paciente_nome: await this.buscarNomePaciente(atendimento.paciente_id),
      };
    },

    async atualizarAtendimento() {
      try {
        const response = await fetch(`http://localhost:3333/api/atendimento/${this.editarAtendimentoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.novoAtendimento),
        });

        if (response.ok) {
          const index = this.atendimentos.findIndex((atendimento) => atendimento.id === this.editarAtendimentoId);
          if (index !== -1) {
            this.atendimentos[index] = this.novoAtendimento;
          }
          this.novoAtendimento = {
            medico_id: null,
            paciente_id: null,
            data_entrada: '',
            data_saida: '',
            notas: '',
            medico_nome: '',
            paciente_nome: '',
          };
        } else {
          console.error('Erro ao atualizar atendimento');
        }
      } catch (error) {
        console.error('Erro ao atualizar atendimento:', error);
      }
    },

    async excluirAtendimento(id) {
      try {
        const response = await fetch(`http://localhost:3333/api/atendimento/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.atendimentos = this.atendimentos.filter((atendimento) => atendimento.id !== id);
        } else {
          console.error('Erro ao excluir atendimento');
        }
      } catch (error) {
        console.error('Erro ao excluir atendimento:', error);
      }
    },

    async carregarAtendimentos() {
      try {
        const response = await fetch('http://localhost:3333/api/atendimento');
        if (response.ok) {
          this.atendimentos = await response.json();
        } else {
          console.error('Erro ao carregar atendimentos');
        }
      } catch (error) {
        console.error('Erro ao carregar atendimentos:', error);
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

    async carregarMedicos() {
      try {
        const response = await fetch('http://localhost:3333/api/medicos');
        if (response.ok) {
          this.medicos = await response.json();
        } else {
          console.error('Erro ao carregar médicos');
        }
      } catch (error) {
        console.error('Erro ao carregar médicos:', error);
      }
    },
  },
  mounted() {
    this.carregarAtendimentos();
    this.carregarPacientes();
    this.carregarMedicos();
  },
};
</script>
