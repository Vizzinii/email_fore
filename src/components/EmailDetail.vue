<template>
  <div class="email-detail-container">
    <h1>{{ email.subject }}</h1>
    <p><strong>发件人:</strong> {{ email.fromEmail }}</p>
    <p><strong>收件人:</strong> {{ email.toEmail }}</p>
    <p><strong>日期:</strong> {{ formatDate(email.sentDate) }}</p>
    <div class="email-body">
      <p>{{ email.body }}</p>
    </div>
    <button @click="goBack">返回</button>
  </div>
</template>

<script>
import apiClient from '../utils/axios';

export default {
  name: 'EmailDetail',
  data() {
    return {
      email: {}
    };
  },
  methods: {
    async fetchEmailDetail() {
      try {
        const response = await apiClient.get(`/mail/${this.$route.params.emailId}`);
        this.email = response.data;
        this.markAsRead();
      } catch (error) {
        console.error('Error fetching email detail:', error);
      }
    },
    async markAsRead() {
      try {
        await apiClient.post(`/mail/markAsRead`, { emailId: this.$route.params.emailId });
      } catch (error) {
        console.error('Error marking email as read:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    goBack() {
      this.$router.push({ name: 'Inbox' });
    }
  },
  mounted() {
    this.fetchEmailDetail();
  }
};
</script>

<style scoped>
.email-detail-container {
  padding: 20px;
}

.email-body {
  margin-top: 20px;
}
</style>