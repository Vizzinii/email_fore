<template>
    <div class="trash-container">
      
      <div class="trash-list">
        <!-- Trash items will be listed here -->
        <div class="trash-item" v-for="item in trashItems" :key="item.id">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
          <div class="button-group">
            <button class="btn btn-primary">恢复</button>
            <button class="btn btn-secondary">永久删除</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Trash_tr',
    data() {
      return {
        trashItems: [
          { id: 1, title: '已删除邮件1', content: '这是被删除文件1的内容' },
          { id: 2, title: '已删除邮件2', content: '这是被删除文件2的内容' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .trash-container {
    flex-grow: 1;
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    position: absolute;
    left:200px;
    top:50.8px;
    bottom: 0;
    right:0;
  }
  
  .trash-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .trash-item {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
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
  