<template>
  <v-container class="ma-5">
    <v-card>
      <v-card-title>Distribuição de Usuários por Estado</v-card-title>
      <v-card-text>
        <canvas ref="stateChartCanvas"></canvas>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/userStore';

Chart.register(...registerables);

export default {
  setup() {
    const stateChartCanvas = ref(null);
    const stateChartInstance = ref(null);
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);

    const getUsersByState = () => {
      const stateCounts = {};
      users.value.forEach((user) => {
        const state = user.estado || 'Não Informado';
        stateCounts[state] = (stateCounts[state] || 0) + 1;
      });
      console.log('Contagem de usuários por estado:', stateCounts);
      return stateCounts;
    };

    const destroyStateChart = () => {
      if (stateChartInstance.value) {
        stateChartInstance.value.destroy();
        stateChartInstance.value = null;
      }
    };

    const createStateChart = () => {
      destroyStateChart();

      const stateData = getUsersByState();
      const labels = Object.keys(stateData);
      const data = Object.values(stateData);

      console.log('Criando gráfico de estados com:', { labels, data }); // Debug

      const backgroundColors = labels.map(
        (_, index) => `hsl(${(index * 360) / labels.length}, 70%, 60%)`
      );

      stateChartInstance.value = new Chart(stateChartCanvas.value, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              label: 'Usuários por Estado',
              data,
              backgroundColor: backgroundColors,
              borderColor: '#fff',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    };

    onMounted(() => {
      createStateChart();

      watch(
        users,
        (newUsers, oldUsers) => {
          console.log('Usuários alterados:', { newUsers, oldUsers });
          createStateChart();
        },
        { deep: true }
      );
    });

    onBeforeUnmount(() => {
      destroyStateChart();
    });

    return { stateChartCanvas };
  },
};
</script>

<style scoped>
.ma-5 {
  margin: 20px;
}
</style>
