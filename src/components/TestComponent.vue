<template>
  <div class="test">
    <h2>Test API Endpoint</h2>
    <button @click="testApi">Test API</button>
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script>
import apiClient from '../utils/axios';

export default {
  data() {
    return {
      response: null,
    };
  },
  methods: {
    async testApi() {
      try {
        const res = await apiClient.get('/users/test');
        this.response = res.data;
      } catch (err) {
        this.response = 'Error: ' + err.message;
      }
    },
  },
};
</script>

<style>
.test {
  max-width: 300px;
  margin: 100px auto;
  padding: 2em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  text-align: center;
}
</style>