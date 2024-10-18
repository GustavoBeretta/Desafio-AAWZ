<template>
  <v-container class="ma-5">
    <v-card>
      <v-card-title>Distribuição de Usuários por Origem</v-card-title>
      <v-card-text>
        <canvas ref="originChartCanvas"></canvas>
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
    const originChartCanvas = ref(null);
    const originChartInstance = ref(null);
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);

    const getUsersByOrigin = () => {
      const originCounts = {};
      users.value.forEach((user) => {
        const origin = user.origin || 'Não Informado';
        originCounts[origin] = (originCounts[origin] || 0) + 1;
      });
      console.log('Contagem de usuários por origem:', originCounts);
      return originCounts;
    };

    const destroyOriginChart = () => {
      if (originChartInstance.value) {
        originChartInstance.value.destroy();
        originChartInstance.value = null;
      }
    };

    const createOriginChart = () => {
      destroyOriginChart();

      const originData = getUsersByOrigin();
      const labels = Object.keys(originData);
      const data = Object.values(originData);

      console.log('Criando gráfico de origem com:', { labels, data });

      const backgroundColors = labels.map(
        (_, index) => `hsl(${(index * 360) / labels.length}, 70%, 60%)`
      );e

      originChartInstance.value = new Chart(originChartCanvas.value, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              label: 'Usuários por Origem',
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
      createOriginChart();

      watch(
        users,
        (newUsers, oldUsers) => {
          console.log('Usuários alterados:', { newUsers, oldUsers });
          createOriginChart();
        },
        { deep: true }
      );
    });

    onBeforeUnmount(() => {
      destroyOriginChart();
    });

    return { originChartCanvas };
  },
};
</script>

<style scoped>
.ma-5 {
  margin: 20px;
}
</style>
