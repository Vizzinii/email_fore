<template>
  <div class="content-container">
    <div class="email-detail">
      <h2>{{ draft.draftId ? '编辑草稿' : '新建草稿' }}</h2>
      <div class="email-info">
        <label>发送到:</label>
        <input v-model="draft.toEmail" type="email" placeholder="Enter recipient's email">
      </div>
      <div class="email-info">
        <label>主题:</label>
        <input v-model="draft.subject" type="text" placeholder="Enter subject">
      </div>
      <div class="email-body">
        <label>内容:</label>
        <textarea v-model="draft.body" placeholder="Type your message here"></textarea>
      </div>
      <div class="button-group">
        <button class="btn btn-primary" @click="saveDraft">保存草稿</button>
        <button class="btn btn-primary" @click="sendEmail">发送邮件</button>
        <button class="btn btn-secondary" @click="goBack">不保存返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../utils/axios';

export default {
  name: 'DraftDetail',
  data() {
    return {
      draft: {
        draftId: null,
        fromEmail: this.$store.getters.userEmail,
        toEmail: '',
        subject: '',
        body: '',
        userId: this.$store.getters.userId
      }
    };
  },
  methods: {
    async fetchDraft() {
      const draftId = this.$route.params.draftId;
      if (draftId) {
        try {
          const response = await apiClient.get(`/drafts/${draftId}`);
          this.draft = response.data;
        } catch (error) {
          console.error('Error fetching draft:', error);
        }
      }
    },
    async saveDraft() {
      try {
        await apiClient.post('/drafts/save', this.draft);
        this.$router.push({ name: 'Drafts' });
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    },
    async sendEmail() {
      try {
        await this.saveDraft();
        this.$router.push({
          name: 'ComposeEmail',
          query: {
            to: this.draft.toEmail,
            subject: this.draft.subject,
            body: this.draft.body
          }
        });
      } catch (error) {
        console.error('Error sending email:', error);
      }
    },
    goBack() {
      this.$router.push({ name: 'Drafts' });
    }
  },
  mounted() {
    this.fetchDraft();
  }
};
</script>


<style scoped>
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
}

.email-info {
  margin-bottom: 20px;
}

.email-info label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.email-body label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.email-info input,
.email-body textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
}

.email-body textarea {
  height: 200px;
  resize: none;
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
  font-size: 14px;
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