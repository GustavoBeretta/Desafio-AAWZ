<template>
    <v-container class="ma-5">
      <v-card>
        <v-card-title>Distribuição de Usuários por Estado</v-card-title>
        <v-card-text>
          <canvas ref="chartCanvas"></canvas>
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
      const chartCanvas = ref(null); // Referência para o canvas do gráfico
      const chartInstance = ref(null); // Instância do gráfico
      const userStore = useUserStore();
      const { users } = storeToRefs(userStore); // Referência reativa para usuários
  
      // Função para contar os usuários por estado
      const getUsersByState = () => {
        const stateCounts = {};
        users.value.forEach((user) => {
          const state = user.estado || 'Não Informado';
          stateCounts[state] = (stateCounts[state] || 0) + 1;
        });
        console.log('Contagem de usuários por estado:', stateCounts); // Debug
        return stateCounts;
      };
  
      // Função para destruir o gráfico
      const destroyChart = () => {
        if (chartInstance.value) {
          chartInstance.value.destroy();
          chartInstance.value = null;
        }
      };
  
      // Função para criar o gráfico
      const createChart = () => {
        destroyChart(); // Garante que não há instância anterior
  
        const stateData = getUsersByState();
        const labels = Object.keys(stateData);
        const data = Object.values(stateData);
  
        console.log('Criando gráfico com:', { labels, data }); // Debug
  
        chartInstance.value = new Chart(chartCanvas.value, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Usuários por Estado',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      };
  
      onMounted(() => {
        createChart();
  
        // Watch para detectar mudanças na lista de usuários e recriar o gráfico
        watch(
          users,
          (newUsers, oldUsers) => {
            console.log('Usuários alterados:', { newUsers, oldUsers }); // Debug
            createChart(); // Recria o gráfico ao invés de atualizá-lo
          },
          { deep: true }
        );
      });
  
      onBeforeUnmount(() => {
        destroyChart(); // Limpa o gráfico ao desmontar o componente
      });
  
      return { chartCanvas };
    },
  };
  </script>
  
  <style scoped>
  .ma-5 {
    margin: 20px;
  }
  </style>
  