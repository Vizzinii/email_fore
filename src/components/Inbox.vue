<template>
  <div class="main-content">
    <ul class="email-list">
      <li v-for="(email, index) in sortedEmails" :key="index" @click="viewEmail(email)">
        <div class="email-info">
          <div class="left-section">
            <div :class="['subject', email.read ? 'read' : 'unread']">{{ email.subject }}</div>
            <div class="from">{{ email.fromEmail }}</div>
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
  name: 'Inbox',
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
    async fetchInbox() {
      if (!this.userEmail) {
        console.error('User email not available');
        return;
      }
      try {
        const userId = await this.$store.dispatch('fetchUserIdByEmail', this.userEmail);
        console.log('Fetching inbox for user ID:', userId);
        const response = await apiClient.get('/mail/inbox', { params: { toId: userId } });
        console.log('Inbox response:', response.data);
        this.emails = response.data;
        // 检查每封邮件的 read 字段
        this.emails.forEach(email => {
          console.log(`Email ID: ${email.emailId}, Subject: ${email.subject}, read: ${email.read}`);
        });
        console.log('Emails data assigned:', this.emails);
      } catch (error) {
        console.error('Error fetching inbox:', error);
      }
    },
    async viewEmail(email) {
      if (!email.read) {
        try {
          const response = await apiClient.put(`/mail/read/${email.emailId}`);
          if (response.status === 200) {
            email.read = true;
            this.fetchInbox();
          }
        } catch (error) {
          console.error('Error updating email read status:', error);
        }
      }
      this.$router.push({ name: 'EmailDetail', params: { emailId: email.emailId } });
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm');
    }
  },
  mounted() {
    this.fetchInbox();
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
  align-items: flex-start; /* 确保子元素靠左对齐 */
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

.email-list li .from {
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

.email-list li .status {
  color: #666;
}

.email-list li .preview {
  color: #666;
}
</style>