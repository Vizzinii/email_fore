<template>
    <div class="sidebar">
      <router-link to="/home">主页</router-link>
      <router-link to="/inbox">收件箱</router-link>
      <router-link to="/compose">发送邮件</router-link>
      <router-link to="/drafts">草稿箱</router-link>
      <router-link to="/trash">回收站</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Side_bar',
    
  }
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px;
    background-color: #adee8c;
    color: white;
    padding: 20px;
    box-sizing: border-box;
    left:0;
    position:absolute;
    top:50.8px;
    bottom: 0;
  }
  .sidebar a {
    color: white;
    text-decoration: none;
    display: block;
    padding: 10px 0;
  }
  </style>
