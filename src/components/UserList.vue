<template>
  <v-container class="ma-5">
    <v-card>
      <v-card-title>Lista de Usuários</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(user, index) in userStore.users"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ user.email }} - {{ user.origin }} - {{ user.logradouro }}, N°{{ user.number }}, {{ user.bairro }}, CEP {{ user.cep }}, {{ user.cidade }}, {{ user.estado }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-subtitle>
        Total de Usuários: {{ userStore.totalUsers }}
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import { useUserStore } from '../stores/userStore';

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
};
</script>

<style scoped>
.ma-5 {
  margin: 20px;
}
</style>
