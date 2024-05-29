<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
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
      register() {
        // 模拟注册操作
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style>
  .register {
    max-width: 300px;
    margin: 100px auto;
    padding: 2em;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    text-align: center;
  }
  </style>
  