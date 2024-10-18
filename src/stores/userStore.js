import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
  }),
  actions: {
    addUser(user) {
      this.users.push(user);
    },
  },
  getters: {
    totalUsers: (state) => state.users.length,
  },
});
