<template>
  <div class="content-container">
    <div class="compose-form">
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="to">发送到:</label>
          <input type="text" id="to" v-model="email.to" class="input-field" required />
        </div>
        <div class="form-group">
          <label for="subject">主题:</label>
          <input type="text" id="subject" v-model="email.subject" class="input-field" required />
        </div>
        <div class="form-group">
          <label for="body">内容:</label>
          <textarea id="body" v-model="email.body" class="input-field textarea-field" required></textarea>
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-primary">发送</button>
          <button type="button" class="btn btn-secondary" @click="cancel">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from '../utils/axios';

export default {
  name: 'ComposeEmail',
  data() {
    return {
      email: {
        from: '',
        to: '',
        subject: '',
        body: ''
      }
    };
  },
  methods: {
    async sendEmail() {
      try {
        const response = await apiClient.post('/mail/send', this.email);
        alert('Email sent!');
        this.$router.push({ name: 'Inbox' });
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email.');
      }
    },
    cancel() {
      this.$router.push({ name: 'Inbox' });
    }
  }
};
</script>

  <style scoped>
  
  
  body, html {
    height: 100%;
    margin: 0;
  }
  
  .content-container {
    flex-grow: 1;
      background-color: white;
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
      position: absolute;
      left:200px;
      top:50.8px;
      bottom: 0;
      right:0; 
  }
  
  .compose-form {
    /*flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;*/
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
   margin-left:0px;
   width: 1400px;
  
  position: relative;
  }
  
  .form-group {
    width: 100%;
    margin-bottom: 15px;
  }
  
  .label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .input-field {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .textarea-field {
    width: 1500;
    height: 420px;
    resize:both;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
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
  