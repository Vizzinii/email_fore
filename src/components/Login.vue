<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" @click="loginHandle">Login</button>
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
    loginHandle() {
      // 简单的示例验证逻辑
      if (this.email === '888' && this.password === '888') {
        // 验证成功，跳转到邮箱内部界面
        this.$router.push('/home');
      } else {
        alert('Invalid email or password');
      }
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
  