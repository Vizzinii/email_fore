<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        // 模拟登录操作
        this.$router.push('/inbox');
      }
    }
  };
  </script>
  
  <style>
  .login {
    max-width: 300px;
    margin: 100px auto;
    padding: 2em;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    text-align: center;
  }
  </style>
  