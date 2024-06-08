<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="loginHandle">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
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
      loading: false,
      error: null
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    ...mapActions(['login']),
    async loginHandle() {
      this.loading = true;
      this.error = null;
      try {
        await this.login({ email: this.email, password: this.password });
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
  max-width: 300px;
  margin: 200px auto;
  padding: 2em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  text-align: center;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>