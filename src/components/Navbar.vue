<template>
  <nav class="navbar">
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1em;
  position: fixed;  /* 将导航栏固定在页面上 */
  top: 0;           /* 固定在页面顶部 */
  left: 0;
  right: 0;
  z-index: 1000;    /* 确保导航栏在其他内容之上 */
}

.navbar a {
  color: white;
  text-decoration: none;
}
</style>