<template>
  <v-container class="ma-5">
    <v-card>
      <v-card-title>Cadastrar Usuário</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValid" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="user.name"
            label="Nome Completo"
            :rules="[rules.required, rules.minWords(2)]"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            label="E-mail"
            :rules="[rules.required, rules.email]"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.cep"
            label="CEP"
            :rules="[rules.required, rules.validCep]"
            @input="fetchAddress"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.number"
            label="Número"
            :rules="[rules.required, rules.numeric]"
            required
            type="text"
          ></v-text-field>

          <v-text-field
            v-model="user.logradouro"
            label="Logradouro"
            readonly
          ></v-text-field>

          <v-text-field
            v-model="user.bairro"
            label="Bairro"
            readonly
          ></v-text-field>

          <v-text-field
            v-model="user.cidade"
            label="Cidade"
            readonly
          ></v-text-field>

          <v-text-field
            v-model="user.estado"
            label="Estado"
            readonly
          ></v-text-field>

          <v-select
            v-model="user.origin"
            :items="origins"
            label="Origem"
            :rules="[rules.required]"
            required
          ></v-select>

          <v-btn type="submit" color="primary" :disabled="!isValid">
            Cadastrar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
  data() {
    return {
      isValid: false,
      user: {
        name: '',
        email: '',
        cep: '',
        number: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        origin: '',
      },
      origins: ['Digital', 'Físico'],
      rules: {
        required: (value) => !!value || 'Campo obrigatório',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail inválido',
        minWords: (min) => (value) => {
          const wordCount = value ? value.split(' ').filter(word => word.trim() !== '').length : 0;
          return wordCount >= min || 'Digite o nome completo';
        },
        numeric: (value) => /^[0-9]*$/.test(value) || 'Apenas números são permitidos',
        validCep: (value) => this.isValidCep(value) || 'CEP inválido',
      },
    };
  },
  methods: {
    async fetchAddress() {
      if (this.user.cep.length === 8) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${this.user.cep}/json/`
          );

          if (response.data && !response.data.erro) {
            this.user.logradouro = response.data.logradouro || 'Logradouro não encontrado';
            this.user.bairro = response.data.bairro || 'Bairro não encontrado';
            this.user.cidade = response.data.localidade || 'Cidade não encontrada';
            this.user.estado = response.data.uf || 'Estado não encontrado';
            this.isValid = true;
          } else {
            this.resetAddressFields();
            this.isValid = false;
          }
        } catch (error) {
          console.error('Erro ao buscar endereço:', error);
          this.resetAddressFields();
          this.isValid = false;
        }
      } else {
        this.resetAddressFields();
        this.isValid = false;
      }
    },
    resetAddressFields() {
      this.user.logradouro = '';
      this.user.bairro = '';
      this.user.cidade = '';
      this.user.estado = '';
    },
    isValidCep(value) {
      return value && value.length === 8 && /^[0-9]+$/.test(value);
    },
    handleSubmit() {
      if (this.isValid && this.user.logradouro) {
        this.userStore.addUser({ ...this.user });
        console.log('Usuário Cadastrado:', this.user);
        this.$refs.form.reset();
        this.user = { name: '', email: '', cep: '', number: '', logradouro: '', bairro: '', cidade: '', estado: '', origin: '' };
      } else {
        console.warn('Não é possível cadastrar: CEP inválido ou endereço incompleto');
      }
    },
  },
};
</script>

<style scoped>
.ma-5 {
  margin: 20px;
}
</style>
