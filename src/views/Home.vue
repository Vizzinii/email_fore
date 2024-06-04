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
  import Head_er from './components/Header.vue';
  import Sidebar from './components/Sidebar.vue';
  
  export default {
    name: 'App',
    components: {
      Head_er,
      Sidebar
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
  