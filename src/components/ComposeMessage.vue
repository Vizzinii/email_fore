<template>
    <div class="compose-message">
      <h2>Compose a Message</h2>
      <form @submit.prevent="sendMessage">
        <input v-model="recipient" type="text" placeholder="Recipient" required />
        <textarea v-model="message" placeholder="Your message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipient: '',
        message: ''
      };
    },
    methods: {
      sendMessage() {
        // 模拟发送操作
        console.log(`Message sent to ${this.recipient}: ${this.message}`);
        this.recipient = '';
        this.message = '';
        this.$router.push('/inbox');
      }
    }
  };
  </script>
  
  <style>
  .compose-message {
    max-width: 600px;
    margin: 50px auto;
    padding: 2em;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
  }
  </style>
  