<template>
  <div class="main-content">
    <ul class="email-list">
      <li v-for="(email, index) in sortedEmails" :key="index" @click="viewEmail(email)">
        <div class="email-info">
          <div class="left-section">
            <div :class="['subject', email.read ? 'read' : 'unread']">{{ email.subject }}</div>
            <div class="to">To: {{ email.toEmail }} </div>
            <div v-if="email.attachment" class="attachment-indicator">📎 附件</div>
          </div>
          <div class="date-status">
            <div class="date">{{ formatDate(email.sentDate) }}</div>
            <div class="status">{{ email.read ? 'Read' : 'Unread' }}</div>
          </div>
        </div>
        <div class="preview">{{ email.body.substring(0, 50) }}...</div>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '../utils/axios';
import { mapGetters } from 'vuex';
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
        const response = await apiClient.get('/mail/sent', { params: { fromId: userId } });
        console.log('Sent emails response:', response.data);
        this.emails = response.data;
        console.log('Emails data assigned:', this.emails);
      } catch (error) {
        console.error('Error fetching sent emails:', error);
      }
    },
    viewEmail(email) {
      this.$router.push({ name: 'SentEmailDetail', params: { emailId: email.emailId } });
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
.main-content {
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

.email-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.email-list li {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
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
  color: #98abff;
}

.email-list li .subject.read {
  color: gray;
}

.email-list li .to {
  margin-left: 10px;
  color: #666;
}

.date-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.email-list li .date {
  color: #666;
}

.email-list li .preview {
  color: #666;
}
</style>