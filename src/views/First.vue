<template>
    <div id="app">
      <Navbar />
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import Navbar from 'src/components/Navbar.vue';
  
  export default {
    components: {
      Navbar
    }
  };
  </script>
  
  <style>
  
  </style>
  