import { createStore } from 'vuex';
import apiClient from '../utils/axios';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    unreadCount: 0,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.unreadCount = 0; // 清除未读邮件计数
    },
    setUnreadCount(state, count) {
      state.unreadCount = count;
    },
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await apiClient.post('/users/login', credentials);
        if (response.status === 200) {
          commit('setUser', response.data);
          localStorage.setItem('isAuthenticated', true);
          await dispatch('fetchUnreadCount'); // 登录后获取未读邮件计数
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
        return response.data.userId;
      } catch (error) {
        throw new Error('Failed to fetch user ID');
      }
    },
    async fetchUnreadCount({ commit, getters }) {
      if (!getters.userId) return;
      try {
        const response = await apiClient.get('/mail/unread-count', { params: { userId: getters.userId } });
        commit('setUnreadCount', response.data);
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    },
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
    },
    unreadCount(state) {
      return state.unreadCount;
    },
  },
  modules: {},
});