<template>
  <div class="content-container">
    <div class="email-detail">
      <h2 class="email-subject">{{ email.subject }}</h2>
      <p class="email-info"><strong>From:</strong> {{ email.fromEmail }}</p>
      <p class="email-info"><strong>To:</strong> {{ email.toEmail }}</p>
      <p class="email-info"><strong>Date:</strong> {{ formatDate(email.sentDate) }}</p>
      <div v-if="email.attachment" class="email-attachment">
        <strong>Attachment:</strong>
        <a :href="getAttachmentUrl(email.attachment.attachmentId)" target="_blank">{{ email.attachment.fileName }}</a>
      </div>
      <div class="email-body">{{ email.body }}</div>
      <div class="button-group">
        <button class="btn btn-secondary" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import apiClient from '../utils/axios';
import moment from 'moment';

export default {
  name: 'SentEmailDetail',
  data() {
    return {
      email: {
        subject: '',
        from: '',
        to: '',
        body: '',
        sentDate: ''
      }
    };
  },
  computed: {
    ...mapGetters(['userEmail'])
  },
  methods: {
    async fetchEmailDetail() {
      const emailId = this.$route.params.emailId;
      try {
        const response = await apiClient.get(`/mail/${emailId}`);
        this.email = response.data;
      } catch (error) {
        console.error('Error fetching email detail:', error);
      }
    },
    goBack() {
      this.$router.push({ name: 'SentEmails' });
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm');
    },
    getAttachmentUrl(attachmentId) {
      return `http://192.168.237.18:8080/api/attachments/download/${attachmentId}`;
    }

  },
  mounted() {
    this.fetchEmailDetail();
  }
};
</script>

<style scoped>
.content-container {
  flex-grow: 1;
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  left: 200px;
  top: 50.8px;
  bottom: 0;
  right: 0;
}

.email-detail {
  text-align: left;
}

.email-subject {
  font-size: 24px;
  font-weight: bold;
}

.email-info {
  margin: 10px 0;
}

.email-body {
  margin: 20px 0;
}

.button-group {
  display: flex;
  justify-content: flex-start;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>