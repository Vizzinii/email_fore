<template>
    <div id="app">
      <Head_er />
      <div class="container">
        <Sidebar />
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import Head_er from './Header.vue';
  import Sidebar from './Sidebar.vue';
  import MainContent from './MainContent.vue';
import ComposeEmail from './ComposeEmail.vue';
import Trash_tr from './Trash.vue';
import Drafts_dr from './Drafts.vue';
  
  export default {
    name: 'App',
    components: {
      Head_er,
      Sidebar,
      MainContent,
      Drafts_dr,
      ComposeEmail,
      Trash_tr
    }
    };
    
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f6f6f6;
  }
  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .container {
    display: flex;
    height: calc(100vh - 50px);
  }
  </style>
  