# Desafio AAWZ

Este projeto é uma aplicação Vue 3 que permite o cadastro de usuários com informações como nome, email, endereço e origem. Ele exibe uma lista de usuários e utiliza gráficos para apresentar a distribuição por estado e por origem.

## Tecnologias Utilizadas
- **Vue 3**: Framework frontend para construção de interfaces.
- **Vuetify**: Biblioteca de componentes UI baseada em Material Design.
- **Pinia**: Biblioteca de gerenciamento de estado.
- **Chart.js**: Biblioteca para criação de gráficos.
- **Axios**: Cliente HTTP para comunicação com a API de CEP.

---

## Funcionalidades
- **Cadastro de Usuários**: Preenchimento de nome, email, CEP, número e origem.
- **Validação de Formulários**: Regras de validação como e-mail válido e preenchimento obrigatório.
- **Integração com API de CEP**: Preenchimento automático de endereço com base no CEP.
- **Exibição de Lista de Usuários**: Nome, email, origem e endereço completo.
- **Gráficos Interativos**: Distribuição de usuários por estado e origem.

---

## Instalação e Execução

### Pré-requisitos
Certifique-se de ter instalado:
- **Node.js**: [https://nodejs.org](https://nodejs.org)  
- **Git**: [https://git-scm.com](https://git-scm.com)

### Passo a Passo

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/desafio-aawz.git
   cd desafio-aawz

2. **Instale as Dependências**
    ```bash
   npm install

3. **Execute o projeto**
    ```bash
   npm run dev

A aplicação estará disponível em http://localhost:3000.

## Estrutura do Projeto

   ```bash
   src/
   ├── components/
   │   ├── UserForm.vue  # Formulário de cadastro de usuário
   │   ├── UserList.vue  # Lista de usuários cadastrados
   │   ├── StateDistributionChart.vue # Gráfico de distribuição de usuários por estado
   │   ├── StateDistributionChart.vue # Gráfico de distribuição de usuários por origem
   ├── stores/
   │   └── userStore.js  # Gerenciamento de estado com Pinia
   └── App.vue           # Componente principal da aplicação
