<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">Registration successful! Redirecting to login...</p>
  </div>
</template>

<script>
import apiClient from '../utils/axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null,
      success: false
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async register() {
      this.error = null;
      this.success = false;
      try {
        const response = await apiClient.post('/users/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.success = true;
        setTimeout(() => {
          this.router.push('/login');
        }, 2000); // 注册成功后 2 秒重定向到登录页面
      } catch (err) {
        this.error = 'Registration failed. Please try again.';
      }
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

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>