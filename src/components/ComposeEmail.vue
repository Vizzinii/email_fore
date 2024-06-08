<template>
  <div class="content-container">
    <div class="compose-form">
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="to">发送到:</label>
          <input type="text" id="to" v-model="email.to" class="input-field" required />
        </div>
        <div class="form-group">
          <label for="subject">主题:</label>
          <input type="text" id="subject" v-model="email.subject" class="input-field" required />
        </div>
        <div class="form-group">
          <label for="body">内容:</label>
          <textarea id="body" v-model="email.body" class="input-field textarea-field" required></textarea>
        </div>
        <div class="form-group">
          <label for="attachments">附件:</label>
          <select v-model="selectedAttachmentId" class="input-field">
            <option :value="null">选择附件</option>
            <option v-for="attachment in attachments" :key="attachment.attachmentId" :value="attachment.attachmentId">
              {{ attachment.fileName }}
            </option>
          </select>
          <input type="file" @change="onFileChange" class="input-field">
          <button type="button" class="btn btn-secondary" @click="uploadAttachment">上传附件</button>
        </div>
        <div class="button-group">
          <button type="submit" class="btn btn-primary" :disabled="sending">{{ sending ? '发送中...' : '发送' }}</button>
          <button type="button" class="btn btn-secondary" @click="cancel" :disabled="sending">取消</button>
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
      selectedAttachmentId: null,
      attachments: [],
      newAttachment: null,
      sending: false // 用于标识发送状态
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
      this.sending = true; // 开始发送，禁用按钮并更改文本
      try {
        const emailData = {
          ...this.email,
          attachments: this.selectedAttachmentId ? [{ id: this.selectedAttachmentId }] : []
        };
        const response = await apiClient.post('/mail/send', emailData);
        console.log('Email sent successfully:', response);
        alert('Email sent!');
        // 清空输入内容
        this.email.to = '';
        this.email.subject = '';
        this.email.body = '';
        this.selectedAttachmentId = null;
        this.$router.push({ name: 'ComposeEmail' });
      } catch (error) {
        console.error('Error sending email:', error.response || error.message);
        alert('Failed to send email.');
      } finally {
        this.sending = false; // 完成发送，重新启用按钮并恢复文本
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
        this.selectedAttachmentId = response.data.attachmentId;
        this.newAttachment = null;
      } catch (error) {
        console.error('上传失败:', error);
        alert('文件上传失败,请检查在附件库中是否有同名文件,请重命名文件或删除同名文件！');
      }
    },
    cancel() {
      if (!this.sending) {
        this.$router.push({ name: 'ComposeEmail' });
      }
    }
  },
  mounted() {
    // 处理路由传递的查询参数
    const query = this.$route.query;
    if (query.to) {
      this.email.to = query.to;
    }
    if (query.subject) {
      this.email.subject = query.subject;
    }
    this.loadAttachments();
  }
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
}

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

.compose-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-left: 0px;
  width: 1400px;
  position: relative;
}

.form-group {
  width: 100%;
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  margin-bottom: 10px;
}

.textarea-field {
  width: 1500px;
  height: 420px;
  resize: both;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
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