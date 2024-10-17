<template>
  <v-app>
    <UserForm />
    <UserList />
    <StateDistributionChart />
    <OriginDistributionChart />
  </v-app>
</template>

<script>
import UserForm from './components/UserForm.vue';
import UserList from './components/UserList.vue';
import StateDistributionChart from './components/StateDistributionChart.vue';
import OriginDistributionChart from './components/OriginDistributionChart.vue';

export default {
  components: {
    UserForm,
    UserList,
    StateDistributionChart,
    OriginDistributionChart,
  },
};
</script>

<style>
@import 'vuetify/styles';
</style>
