<template>
    <div class="drafts-container">
      
      <div class="compose-form">
        <div class="form-group">
          <label class="label" for="title">标题</label>
          <input type="text" id="title" class="input-field" placeholder="输入标题">
        </div>
        <div class="form-group">
          <label class="label" for="content">内容</label>
          <textarea id="content" class="input-field textarea-field" placeholder="输入内容"></textarea>
        </div>
        <div class="button-group">
          <button class="btn btn-primary">保存草稿</button>
          <button class="btn btn-secondary">放弃更改</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Drafts_dr',
    data() {
    return {
      drafts: [],
    };
  },
  created() {
    this.loadDrafts();
  },
  methods: {
    loadDrafts() {
      // 模拟数据加载
      this.drafts = [
        { id: 1, title: 'Draft 1' },
        { id: 2, title: 'Draft 2' },
      ];
    },
  },
  };
  </script>
  
  <style scoped>
  .drafts-container {
    flex-grow: 1;
    background-color: white;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    position: absolute;
    left:15%;
    top:60px;
    bottom: 0;
    right:0; 
  }
  
  .compose-form {
    background-color: #fff;
    padding: 0;
    border-radius: 8px;
    width: 100%;
    position: relative;
  }
  
  .form-group {
    width: 100%;
    margin-bottom: 15px;
  }
  
  .label {
    font-weight: bold;
    margin-bottom: 5px;
    height:500px;
    resize: vertical;
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
    width: 100%;
  height: 420px;
  resize:both;
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
  