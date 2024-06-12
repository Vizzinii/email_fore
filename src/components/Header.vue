<template>
  <div class="header">
    <div class="logo">皮卡鱼邮箱</div>
    <div class="user-info">Hello, {{ userEmail }}</div>
    <div class="exit" @click="confirmExit">退出登录</div>

    <div v-if="showConfirmDialog" class="confirm-dialog">
      <div class="dialog-content">
        <p class="dialog-text">你确定要退出登录吗？</p>
        <div class="dialog-buttons">
          <button @click="exitMethod" class="btn btn-primary">确定</button>
          <button @click="cancelExit" class="btn btn-secondary">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      showConfirmDialog: false
    };
  },
  computed: {
    ...mapGetters(['userEmail'])
  },
  methods: {
    confirmExit() {
      this.showConfirmDialog = true;
    },
    exitMethod() {
      this.showConfirmDialog = false;
      this.$router.push('/');
    },
    cancelExit() {
      this.showConfirmDialog = false;
    }
  }
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

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

.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.dialog-text {
  color: #333;
  margin-bottom: 20px;
}

.dialog-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>