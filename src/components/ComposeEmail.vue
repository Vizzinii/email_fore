<template>
  <div class="content-container">
    <div class="compose-form">
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="to">发送到:</label>
          <input type="email" id="to" v-model="email.to" class="input-field" placeholder="Enter recipient's email" required />
        </div>
        <div class="form-group">
          <label for="subject">主题:</label>
          <input type="text" id="subject" v-model="email.subject" class="input-field" placeholder="Enter subject" required />
        </div>
        <div class="form-group">
          <label for="body">内容:</label>
          <textarea id="body" v-model="email.body" class="input-field textarea-field" placeholder="Type your message here" required></textarea>
        </div>
        <div class="form-group">
          <label for="attachments">附件:</label>
          <div v-for="(attachment, index) in selectedAttachments" :key="index" class="attachment-group">
            <select v-model="attachment.id" class="input-field">
              <option :value="null">选择附件</option>
              <option v-for="att in attachments" :key="att.attachmentId" :value="att.attachmentId">
                {{ att.fileName }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group upload-section">
          <input type="file" @change="onFileChange" class="file-input" id="fileInput">
          <button type="button" class="btn btn-secondary upload-btn" @click="uploadAttachment">上传附件</button>
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-primary" :disabled="sending">{{ sending ? '发送中...' : '发送' }}</button>
          <button type="button" class="btn btn-secondary" @click="saveToDrafts" :disabled="sending">保存到草稿箱</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      },
      selectedAttachments: [{ id: null }, { id: null }, { id: null }],
      attachments: [],
      newAttachment: null,
      sending: false
    };
  },
  computed: {
    ...mapGetters(['userEmail', 'userId'])
  },
  watch: {
    userEmail: {
      handler(email) {
        this.email.from = email;
      },
      immediate: true
    }
  },
  methods: {
    async sendEmail() {
      console.log('Sending email with data:', this.email);
      this.sending = true;
      try {
        const emailData = {
          ...this.email,
          attachments: this.selectedAttachments.filter(att => att.id !== null)
        };
        const response = await apiClient.post('/mail/send', emailData);
        console.log('Email sent successfully:', response);
        alert('Email sent!');
        this.email.to = '';
        this.email.subject = '';
        this.email.body = '';
        this.selectedAttachments = [{ id: null }, { id: null }, { id: null }];
        this.$router.push({ name: 'ComposeEmail' });
      } catch (error) {
        console.error('Error sending email:', error.response || error.message);
        alert('Failed to send email.');
      } finally {
        this.sending = false;
      }
    },
    async loadAttachments() {
      try {
        const response = await apiClient.get(`/attachments/user/${this.userId}`);
        this.attachments = response.data;
      } catch (error) {
        console.error('获取附件失败:', error);
      }
    },
    onFileChange(event) {
      this.newAttachment = event.target.files[0];
    },
    async uploadAttachment() {
      if (!this.newAttachment) {
        alert('请选择一个文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.newAttachment);
      formData.append('userId', this.userId);

      try {
        const response = await apiClient.post('/attachments/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.attachments.push(response.data);
        this.newAttachment = null;
        alert('附件上传成功'); // 上传成功提示
      } catch (error) {
        console.error('上传失败:', error);
        alert('文件上传失败,请检查在附件库中是否有同名文件,请重命名文件或删除同名文件！');
      }
    },
    cancel() {
      if (!this.sending) {
        this.$router.push({ name: 'ComposeEmail' });
      }
    },
    async saveToDrafts() {
      const draft = {
        fromEmail: this.email.from,
        toEmail: this.email.to,
        subject: this.email.subject,
        body: this.email.body,
        userId: this.$store.getters.userId
      };
      try {
        await apiClient.post('/drafts/save', draft);
        console.log('Draft saved successfully');
        this.$router.push({ name: 'Drafts' });
      } catch (error) {
        console.error('Error saving draft:', error);
        alert('Failed to save draft.');
      }
    }
  },
  mounted() {
    const query = this.$route.query;
    if (query.to) {
      this.email.to = query.to;
    }
    if (query.subject) {
      this.email.subject = query.subject;
    }
    if (query.body) {
      this.email.body = query.body;
    }
    this.loadAttachments();
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

.compose-form {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
}

.textarea-field {
  height: 150px;
  resize: vertical;
}

.upload-section {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.file-input {
  flex-grow: 1;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  height: 40px; /* 统一按钮高度 */
}

.btn-primary {
  background-color: #007bff;
  color: white;
  text-align: center;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  text-align: center;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.attachment-group {
  margin-bottom: 10px;
}

.attachment-group select {
  width: 100%;
}
</style>