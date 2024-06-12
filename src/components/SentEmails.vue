<template>
  <div class="main-content">
    <ul class="email-list">
      <li v-for="(email, index) in sortedEmails" :key="index" @click="viewEmail(email)">
        <div class="email-info">
          <div class="left-section">
            <div :class="['subject', email.read ? 'read' : 'unread']">{{ email.subject }}</div>
            <div class="to">To: {{ email.toEmail }}</div>
            <div v-if="email.attachment1 || email.attachment2 || email.attachment3" class="attachment-indicator">📎
              附件
            </div>
          </div>
          <div class="date-status">
            <div class="date">{{ formatDate(email.sentDate) }}</div>
            <div :class="['status', email.read ? 'read-status' : 'unread-status']">{{
                email.read ? 'Read' : 'Unread'
              }}
            </div>
          </div>
        </div>
        <div class="preview">{{ email.body.substring(0, 50) }}...</div>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '../utils/axios';
import {mapGetters} from 'vuex';
import moment from 'moment';

export default {
  name: 'SentEmails',
  data() {
    return {
      emails: []
    };
  },
  computed: {
    ...mapGetters(['userEmail']),
    sortedEmails() {
      return this.emails.slice().sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate));
    }
  },
  methods: {
    async fetchSentEmails() {
      if (!this.userEmail) {
        console.error('User email not available');
        return;
      }
      try {
        const userId = await this.$store.dispatch('fetchUserIdByEmail', this.userEmail);
        console.log('Fetching sent emails for user ID:', userId);
        const response = await apiClient.get('/mail/sent', {params: {fromId: userId}});
        console.log('Sent emails response:', response.data);
        this.emails = response.data;
        console.log('Emails data assigned:', this.emails);
      } catch (error) {
        console.error('Error fetching sent emails:', error);
      }
    },
    viewEmail(email) {
      this.$router.push({name: 'SentEmailDetail', params: {emailId: email.emailId}});
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm');
    }
  },
  mounted() {
    this.fetchSentEmails();
  }
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

.main-content {
  flex-grow: 1;
  background-color: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  left: 15%;
  top: 60px;
  bottom: 0;
  right: 0;
}

.email-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.email-list li {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.email-list li:hover {
  background-color: #f1f1f1;
}

.email-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.left-section {
  display: flex;
  flex-direction: column;
}

.email-list li .subject {
  font-weight: bold;
}

.email-list li .subject.unread {
  color: #007bff;
}

.email-list li .subject.read {
  color: gray;
}

.email-list li .to {
  margin-top: 5px;
  color: #666;
}

.attachment-indicator {
  margin-top: 5px;
  color: #007bff;
  font-size: 14px;
}

.date-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.email-list li .date {
  color: #666;
  margin-bottom: 5px;
}

.email-list li .status {
  font-weight: bold;
}

.email-list li .status.unread-status {
  color: #007bff;
}

.email-list li .status.read-status {
  color: gray;
}

.email-list li .preview {
  margin-top: 10px;
  color: #666;
}
</style>