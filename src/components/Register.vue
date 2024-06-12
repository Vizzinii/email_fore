<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <input v-model="username" type="text" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <div class="form-group">
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
      </div>
      <div class="form-group">
        <button type="submit">Register</button>
      </div>
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
      confirmPassword: '',
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

      // 检查密码和确认密码是否匹配
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

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
        if (err.response && err.response.data) {
          this.error = err.response.data.message;
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      }
    }
  }
};
</script>

<style>
.register {
  width: 300px;
  margin: 200px auto;
  padding: 2em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="password"],
button[type="submit"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
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