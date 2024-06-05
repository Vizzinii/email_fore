import { createRouter, createWebHistory } from 'vue-router';
import First from './components/First.vue';
import Home from './components/Home.vue';
import MainContent from './components/MainContent.vue';
import ComposeEmail from './components/ComposeEmail.vue';
import Trash_tr from './components/Trash.vue';
import Drafts_dr from './components/Drafts.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Inbox from './components/Inbox.vue'; // 修改了这里的路径
import EmailDetail from './components/EmailDetail.vue'; // 修改了这里的路径

const routes = [
  {
    path: '/',
    component: First,
    children: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'MainContent',
        component: MainContent,
      },
      {
        path: '/inbox',
        name: 'Inbox',
        component: Inbox,
        meta: { requiresAuth: true }
      },
      {
        path: '/compose',
        name: 'ComposeEmail',
        component: ComposeEmail,
      },
      {
        path: '/trash',
        name: 'Trash_tr',
        component: Trash_tr,
      },
      {
        path: '/drafts',
        name: 'Drafts_dr',
        component: Drafts_dr,
      },
      {
        path: '/email/:emailId',
        name: 'EmailDetail',
        component: EmailDetail,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;