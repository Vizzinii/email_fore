<template>
  <div class="attachments-container">
    <div class="header">
      <h1>附件箱</h1>
      <div class="upload-section">
        <input type="file" @change="onFileChange" />
        <button class="upload-button" @click="uploadAttachment">上传附件</button>
      </div>
    </div>
    <div class="attachments-list">
      <h2>已上传的附件</h2>
      <div class="search-bar">
        <input v-model="searchKeyword" placeholder="搜索附件" />
        <button @click="searchAttachments" class="btn btn-primary">搜索</button>
        <button @click="resetSearch" class="btn btn-secondary">重置</button>
      </div>
      <ul>
        <li v-if="attachments.length === 0" class="no-attachments-message">没有相关附件！</li>
        <li v-else v-for="attachment in attachments" :key="attachment.attachmentId">
          <a :href="`http://192.168.237.18:8080/api/attachments/download/${attachment.attachmentId}`" target="_blank">{{ attachment.fileName }}</a>
          <button class="delete-button" @click="deleteAttachment(attachment.attachmentId)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import apiClient from '../utils/axios';

export default {
  name: 'Attachments',
  data() {
    return {
      attachments: [],
      selectedFile: null,
      searchKeyword: ''
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
        alert('附件上传成功'); // 上传成功提示
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
    async loadAttachments(keyword = '') {
      try {
        const response = await apiClient.get(`/attachments/user/${this.userId}`, {params: {keyword}});
        this.attachments = response.data;
      } catch (error) {
        console.error('获取附件失败:', error);
      }
    },
    searchAttachments() {
      this.loadAttachments(this.searchKeyword);
    },
    resetSearch() {
      this.searchKeyword = '';
      this.loadAttachments();
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
  background-color: rgba(249, 249, 249, 0.25);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  left: 15%;
  top: 60px;
  bottom: 0;
  right: 0;
}

.header {
  left: 15%;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-bottom: 20px;
  border-radius: 4px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.upload-section {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

input[type="file"] {
  flex-grow: 1;
}

.upload-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.upload-button:hover {
  background-color: #0056b3;
}

.attachments-list {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.attachments-list h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.search-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
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

.attachments-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.no-attachments-message {
  padding: 15px;
  text-align: center;
  color: #666;
}

.attachments-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.attachments-list li a {
  color: #007bff;
  text-decoration: none;
}

.attachments-list li a:hover {
  text-decoration: underline;
}

.delete-button {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>