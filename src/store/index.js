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
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await apiClient.post('/users/login', credentials);
        if (response.status === 200) {
          commit('setUser', response.data);
          localStorage.setItem('isAuthenticated', true);
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearUser');
      localStorage.removeItem('isAuthenticated');
    },
    async fetchUserIdByEmail({ commit }, email) {
      try {
        const response = await apiClient.get('/users/getUserIdByEmail', { params: { email } });
        return response.data.userId; // 这里修改为userId
      } catch (error) {
        throw new Error('Failed to fetch user ID');
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    userId(state) {
      return state.user ? state.user.userId : null;
    },
    userEmail(state) {
      return state.user ? state.user.email : null;
    }
  },
  modules: {},
});