<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="loginHandle">
      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input v-model="password" type="password" placeholder="Password" required />
      </div>
      <div class="form-group remember-me">
        <label>
          <input type="checkbox" v-model="rememberMe" /> Remember Me
        </label>
      </div>
      <div class="form-group">
        <button type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
      </div>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      loading: false,
      error: null
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  mounted() {
    // 尝试从 localStorage 读取账号和密码
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    if (savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  },
  methods: {
    ...mapActions(['login']),
    async loginHandle() {
      this.loading = true;
      this.error = null;
      try {
        await this.login({ email: this.email, password: this.password });
        // 如果用户选择了记住密码，将账号和密码保存到 localStorage
        if (this.rememberMe) {
          localStorage.setItem('savedEmail', this.email);
          localStorage.setItem('savedPassword', this.password);
        } else {
          localStorage.removeItem('savedEmail');
          localStorage.removeItem('savedPassword');
        }
        this.router.push('/home');
      } catch (err) {
        this.error = 'Invalid email or password';
        console.error('Login error:', err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login {
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

.remember-me {
  text-align: right;
}

.remember-me label {
  font-size: 0.8em; /* 调整字体大小 */
}
</style>