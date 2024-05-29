import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Inbox from './components/Inbox.vue';
import ComposeMessage from './components/ComposeMessage.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/inbox', component: Inbox },
  { path: '/compose', component: ComposeMessage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
