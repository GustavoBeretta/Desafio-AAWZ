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
      const originChartCanvas = ref(null); // Referência para o canvas do gráfico
      const originChartInstance = ref(null); // Instância do gráfico
      const userStore = useUserStore();
      const { users } = storeToRefs(userStore); // Referência reativa para usuários
  
      // Função para contar os usuários por origem
      const getUsersByOrigin = () => {
        const originCounts = {};
        users.value.forEach((user) => {
          const origin = user.origin || 'Não Informado';
          originCounts[origin] = (originCounts[origin] || 0) + 1;
        });
        console.log('Contagem de usuários por origem:', originCounts); // Debug
        return originCounts;
      };
  
      // Função para destruir o gráfico
      const destroyOriginChart = () => {
        if (originChartInstance.value) {
          originChartInstance.value.destroy();
          originChartInstance.value = null;
        }
      };
  
      // Função para criar o gráfico
      const createOriginChart = () => {
        destroyOriginChart(); // Garante que não há instância anterior
  
        const originData = getUsersByOrigin();
        const labels = Object.keys(originData);
        const data = Object.values(originData);
  
        console.log('Criando gráfico de origem com:', { labels, data }); // Debug
  
        originChartInstance.value = new Chart(originChartCanvas.value, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Usuários por Origem',
                data,
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
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
        createOriginChart();
  
        // Watch para detectar mudanças na lista de usuários e recriar o gráfico
        watch(
          users,
          (newUsers, oldUsers) => {
            console.log('Usuários alterados:', { newUsers, oldUsers }); // Debug
            createOriginChart(); // Recria o gráfico ao invés de atualizá-lo
          },
          { deep: true }
        );
      });
  
      onBeforeUnmount(() => {
        destroyOriginChart(); // Limpa o gráfico ao desmontar o componente
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
  