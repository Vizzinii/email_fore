<template>
    <div id="app">
      
        <router-view></router-view>
    </div>
  </template>
  
  <script>
  import First from './components/First.vue';
  import Home from './components/Home.vue';


  export default {
    name: 'App',
    components: {
      First,
      Home
    }
    };
    
  </script>
  
  <style>
  
  </style>
  