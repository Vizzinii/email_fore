import { createRouter, createWebHistory } from 'vue-router';
import First from './components/First.vue';
import Home from './components/Home.vue';
import MainContent from './components/MainContent.vue';
import ComposeEmail from './components/ComposeEmail.vue';
import Trash_tr from './components/Trash.vue';
import Drafts_dr from './components/Drafts.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const routes = [
  { path: '/', 
  component: First,
  children:[
    {
    path:'/',
    name:'Login',
    component:Login,
    },

    {
      path:'/register',
      name:'Register',
      component:Register,
    }
]

   },
  
  {
    path:'/home',
    name:'home',
    component:Home,
    children:[
      {
        path: '',
        name: 'MainContent',
        component: MainContent,
      },
        {
        path: '/compose',
        name: 'ComposeEmail',
        component: ComposeEmail,
      },
      {
        path:'/trash',
        name:'Trash_tr',
        component:Trash_tr,
      },
      {
        path:'/drafts',
        name:'Drafts_dr',
        component:Drafts_dr,
      },
    
    ]
  }
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
