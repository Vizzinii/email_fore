import { createStore } from 'vuex';
import apiClient from '../utils/axios';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await apiClient.post('/users/login', credentials);
        commit('setUser', response.data);
        localStorage.setItem('isAuthenticated', true);  // 存储认证状态
      } catch (error) {
        console.error('Failed to login', error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('setUser', null);
      localStorage.removeItem('isAuthenticated');
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  modules: {},
});