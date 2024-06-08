<template>
  <div class="attachments-container">
    <h1>附件箱</h1>
    <div class="upload-section">
      <input type="file" @change="onFileChange" />
      <button @click="uploadAttachment">上传附件</button>
    </div>
    <div class="attachments-list">
      <h2>已上传的附件</h2>
      <ul>
        <li v-for="attachment in attachments" :key="attachment.attachmentId">
          <a :href="`http://192.168.237.18:8080/api/attachments/download/${attachment.attachmentId}`" target="_blank">{{ attachment.fileName }}</a>
          <button @click="deleteAttachment(attachment.attachmentId)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import apiClient from '../utils/axios';

export default {
  name: 'Attachments',
  data() {
    return {
      attachments: [],
      selectedFile: null
    };
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadAttachment() {
      if (!this.selectedFile) {
        alert('请选择一个文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('userId', this.userId);

      try {
        const response = await apiClient.post('/attachments/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        this.attachments.push(response.data);
        this.selectedFile = null;
      } catch (error) {
        console.error('上传失败:', error);
        alert('文件上传失败,请检查在附件库中是否有同名文件,请重命名文件或删除同名文件！');
      }
    },
    async deleteAttachment(attachmentId) {
      if (confirm('确定要删除该附件吗？接收方将无法再下载该附件！')) {
        try {
          await apiClient.delete(`/attachments/${attachmentId}`);
          this.attachments = this.attachments.filter(a => a.attachmentId !== attachmentId);
        } catch (error) {
          console.error('删除失败:', error);
          alert('删除附件失败');
        }
      }
    },
    async loadAttachments() {
      try {
        const response = await apiClient.get(`/attachments/user/${this.userId}`);
        this.attachments = response.data;
      } catch (error) {
        console.error('获取附件失败:', error);
      }
    }
  },
  mounted() {
    this.loadAttachments();
  }
};
</script>

<style scoped>
.attachments-container {
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

.upload-section {
  margin-bottom: 20px;
}

.attachments-list ul {
  list-style: none;
  padding: 0;
}

.attachments-list li {
  margin-bottom: 10px;
  display: flex;
  /*justify-content: space-between;*/
}
</style>