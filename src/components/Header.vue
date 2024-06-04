<template>
    <div class="header">
      <div class="logo">皮卡鱼邮箱</div>
      <div class="user-info">Hello, User</div>
      <div class="exit" v-on:click="exitmethod">退出登录</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Head_er',
    methods:{
      exitmethod(){
        this.$router.push('/');
      }
    }

  }
  </script>
  
  <style scoped>
  .header {
    background-color: #1e97e2;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: left;       
    width: 100vw;
  box-sizing: border-box;
  left:0;
  right:0;
  position:absolute;
  height: 60;
  }
  .header .logo {
    font-size: 24px;
    font-weight: bold;
  }
  .header .user-info {
    font-size: 16px;
  }
  .header .exit {
    font-size: 16px;
  }

  </style>
