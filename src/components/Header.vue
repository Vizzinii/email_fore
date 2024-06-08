<template>
  <div class="header">
    <div class="logo">皮卡鱼邮箱</div>
    <div class="user-info">Hello, {{ userEmail }}</div>
    <div class="exit" @click="exitMethod">退出登录</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['userEmail'])
  },
  methods: {
    exitMethod() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #1e97e2;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1000;
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
  cursor: pointer;
}
</style>