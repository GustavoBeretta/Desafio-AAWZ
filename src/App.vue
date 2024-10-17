<template>
  <v-app>
    <UserForm />
    <UserList />
  </v-app>
</template>

<script>
import UserForm from './components/UserForm.vue';
import UserList from './components/UserList.vue';

export default {
  components: {
    UserForm,
    UserList,
  },
};
</script>

<style>
@import 'vuetify/styles';
</style>
