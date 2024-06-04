<template>
    <div id="app">
      <Navbar />
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import Navbar from './Navbar.vue';
  import Login from './Login.vue';
  import Register from './Register';
  
  export default {
    components: {
      Navbar,
      Login,
      Register
    }
  };
  </script>
  
  <style>
  body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: url('@/assets/img/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

  </style>
  