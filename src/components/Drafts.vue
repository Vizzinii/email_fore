<template>
  <div class="main-content">
    <div class="header">

      <div class="search-bar">
        <input v-model="searchKeyword" placeholder="搜索草稿" />
        <button @click="searchDrafts" class="btn btn-primary">搜索</button>
        <button @click="resetSearch" class="btn btn-secondary">重置</button>
        <button @click="newDraft" class="btn btn-tertiary">新建草稿</button>
      </div>
    </div>
    <ul class="email-list">
      <li v-if="sortedDrafts.length === 0" class="no-emails-message">没有相关草稿！</li>
      <li v-for="(draft, index) in sortedDrafts" :key="index" class="email-item" @click="viewDraft(draft)">
        <div class="email-info">
          <div class="email-header">
            <div class="subject">{{ draft.subject || '无标题草稿' }}</div>
            <div class="to">To: {{ draft.toEmail || '未指定收件人' }}</div>
          </div>
          <div class="preview">{{ draft.body.substring(0, 50) }}...</div>
        </div>
        <div class="email-footer">
          <div class="date">{{ formatDate(draft.updatedAt) }}</div>
          <button @click.stop="confirmDeleteDraft(draft.draftId)" class="btn btn-secondary">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from '../utils/axios';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'Drafts',
  data() {
    return {
      drafts: [],
      searchKeyword: ''
    };
  },
  computed: {
    ...mapGetters(['userId']),
    sortedDrafts() {
      return this.drafts.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
  },
  methods: {
    async fetchDrafts(keyword = '') {
      try {
        const response = await apiClient.get(`/drafts/user/${this.userId}`, { params: { keyword } });
        this.drafts = response.data;
      } catch (error) {
        console.error('Error fetching drafts:', error);
      }
    },
    newDraft() {
      this.$router.push({ name: 'DraftDetail', params: { draftId: null } });
    },
    viewDraft(draft) {
      this.$router.push({ name: 'DraftDetail', params: { draftId: draft.draftId } });
    },
    confirmDeleteDraft(draftId) {
      if (confirm('确定要删除此草稿吗？')) {
        this.deleteDraft(draftId);
      }
    },
    async deleteDraft(draftId) {
      try {
        await apiClient.delete(`/drafts/delete/${draftId}`);
        this.fetchDrafts();
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    },
    searchDrafts() {
      this.fetchDrafts(this.searchKeyword);
    },
    resetSearch() {
      this.searchKeyword = '';
      this.fetchDrafts();
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm');
    }
  },
  mounted() {
    this.fetchDrafts();
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
  align-items: center;
  justify-content: flex-start;

}

.search-bar input {
  flex-grow: 1;
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
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

.btn-tertiary {
  background-color: #007bff;
  color: white;
  margin-left: 5px;
}

.btn-tertiary:hover {
  background-color: #0056b3;
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

.no-emails-message{
  color: #ffffff;
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

.to {
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
  text-align: center;
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