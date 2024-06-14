<template>
  <div class="main-content">
    <div class="header">
      <div class="search-bar">
        <input v-model="searchKeyword" placeholder="搜索邮件" />
        <button @click="searchEmails" class="btn btn-primary">搜索</button>
        <button @click="resetSearch" class="btn btn-secondary">重置</button>
      </div>
    </div>
    <ul class="email-list">
      <li v-if="sortedEmails.length === 0" class="no-emails-message">没有相关邮件！</li>
      <li v-for="(email, index) in sortedEmails" :key="index" class="email-item" @click="viewEmail(email)">
        <div class="email-info">
          <div class="email-header">
            <div :class="['subject', email.read ? 'read' : 'unread']">{{ email.subject }}</div>
            <div class="from">{{ email.fromEmail }}</div>
            <div class="attachment-placeholder">
              <div v-if="email.attachment1 || email.attachment2 || email.attachment3" class="attachment-indicator">📎
                附件
              </div>
            </div>
          </div>
          <div class="preview">{{ email.body.substring(0, 50) }}...</div>
        </div>
        <div class="email-footer">
          <div class="date">{{ formatDate(email.sentDate) }}</div>
          <div :class="['status', email.read ? 'read-status' : 'unread-status']">{{
              email.read ? 'Read' : 'Unread'
            }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '../utils/axios';
import {mapGetters, mapActions} from 'vuex';
import moment from 'moment';

export default {
  name: 'Inbox',
  data() {
    return {
      emails: [],
      searchKeyword: ''
    };
  },
  computed: {
    ...mapGetters(['userEmail']),
    sortedEmails() {
      return this.emails.slice().sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate));
    }
  },
  methods: {
    ...mapActions(['fetchUnreadCount']),
    async fetchInbox(keyword = '') {
      if (!this.userEmail) {
        console.error('User email not available');
        return;
      }
      try {
        const userId = await this.$store.dispatch('fetchUserIdByEmail', this.userEmail);
        const response = await apiClient.get('/mail/inbox', {params: {toId: userId, keyword}});
        this.emails = response.data;
      } catch (error) {
        console.error('Error fetching inbox:', error);
      }
    },
    viewEmail(email) {
      if (!email.read) {
        try {
          const response = apiClient.put(`/mail/read/${email.emailId}`);
          if (response.status === 200) {
            email.read = true;
            this.fetchInbox();
          }
        } catch (error) {
          console.error('Error updating email read status:', error);
        }
      }
      this.fetchUnreadCount(); // 更新未读邮件计数
      this.$router.push({name: 'EmailDetail', params: {emailId: email.emailId}});
    },
    searchEmails() {
      this.fetchInbox(this.searchKeyword);
    },
    resetSearch() {
      this.searchKeyword = '';
      this.fetchInbox();
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
body, html {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

.main-content {
  flex-grow: 1;
  background-color: rgba(249, 249, 249, 0.25);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  left: 15%;
  top: 60px;
  bottom: 0;
  right: 0;
  padding-top: 80px; /* Adjust to give space for fixed header */
}

.header {
  position: fixed;
  top: 60px;
  left: 15%;
  right: 0;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.search-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.search-bar input {
  flex-grow: 1;
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: box-shadow 0.3s ease-in-out;
}

.search-bar input:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
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
  margin-left: 5px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.email-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.email-item {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.email-item:hover {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.email-info {
  flex-grow: 1;
}

.email-header {
  display: flex;
  justify-content: space-between;
}

.subject {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.subject.unread {
  color: #007bff;
}

.subject.read {
  color: gray;
}

.from {
  color: #666;
}

.attachment-placeholder {
  width: 50px; /* 预留空间确保布局一致 */
  text-align: right;
}

.attachment-indicator {
  font-size: 14px;
}

.preview {
  margin-top: 10px;
  color: #666;
  font-style: italic;
}

.email-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.date {
  color: #666;
}

.status {
  font-weight: bold;
}

.status.unread-status {
  color: #007bff;
}

.status.read-status {
  color: gray;
}
</style>