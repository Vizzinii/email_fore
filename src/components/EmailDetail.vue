<template>
  <div class="content-container">
    <div class="email-detail">
      <h2 class="email-subject">{{ email.subject }}</h2>
      <p class="email-info"><strong>From:</strong> {{ email.fromEmail }}</p>
      <p class="email-info"><strong>To:</strong> {{ email.toEmail }}</p>
      <p class="email-info"><strong>Date:</strong> {{ formatDate(email.sentDate) }}</p>
      <div v-if="email.attachment1 || email.attachment2 || email.attachment3" class="email-attachments">
        <strong>Attachments:</strong>
        <div v-if="email.attachment1">
          <a :href="getAttachmentUrl(email.attachment1.attachmentId)" target="_blank">{{
              email.attachment1.fileName
            }}</a>
        </div>
        <div v-if="email.attachment2">
          <a :href="getAttachmentUrl(email.attachment2.attachmentId)" target="_blank">{{
              email.attachment2.fileName
            }}</a>
        </div>
        <div v-if="email.attachment3">
          <a :href="getAttachmentUrl(email.attachment3.attachmentId)" target="_blank">{{
              email.attachment3.fileName
            }}</a>
        </div>
      </div>
      <div class="email-body">{{ email.body }}</div>
      <div class="button-group">
        <button class="btn btn-primary" @click="reply">回复</button>
        <button class="btn btn-secondary" @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import apiClient from '../utils/axios';
import moment from 'moment';

export default {
  name: 'EmailDetail',
  data() {
    return {
      email: {
        subject: '',
        from: '',
        to: '',
        body: '',
        sentDate: '',
        attachment1: null,
        attachment2: null,
        attachment3: null
      }
    };
  },
  computed: {
    ...mapGetters(['userEmail'])
  },
  methods: {
    ...mapActions(['fetchUnreadCount']),
    async fetchEmailDetail() {
      const emailId = this.$route.params.emailId;
      try {
        const response = await apiClient.get(`/mail/${emailId}`);
        this.email = response.data;
        this.fetchUnreadCount(); // 更新未读邮件计数
      } catch (error) {
        console.error('Error fetching email detail:', error);
      }
    },
    goBack() {
      this.$router.push({name: 'Inbox'});
    },
    reply() {
      this.$router.push({
        name: 'ComposeEmail',
        query: {
          to: this.email.fromEmail,
          subject: `Re: ${this.email.subject}`
        }
      });
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
body, html {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

.content-container {
  flex-grow: 1;
  background-color: rgba(249, 249, 249, 0);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  left: 15%;
  top: 60px;
  bottom: 0;
  right: 0;
}

.email-detail {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: 0 auto;
  text-align: left; /* 将文本左对齐 */
}

.email-subject {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.email-info {
  margin: 10px 0;
  color: #666;
}

.email-attachments {
  margin: 20px 0;
  color: #333;
}

.email-attachments a {
  color: #007bff;
  text-decoration: none;
  margin-right: 10px;
}

.email-attachments a:hover {
  text-decoration: underline;
}

.email-body {
  margin: 20px 0;
  white-space: pre-wrap; /* 保持邮件正文中的换行格式 */
  color: #333;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 8px;
}

.button-group {
  display: flex;
  justify-content: flex-start;
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