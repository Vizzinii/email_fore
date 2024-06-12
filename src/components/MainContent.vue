<template>
    <div class="main-content">
      <ul class="email-list">
        <li v-for="(email, index) in emails" :key="index">
          <div class="subject">{{ email.subject }}</div>
          <div class="preview">{{ email.preview }}</div>
        </li>
      </ul>
    
    </div>
  </template>
  
  <script>

  export default {
    name: 'MainContent',

    data() {
      return {
        emails: [
          { subject: '欢迎使用皮卡邮箱', preview: '感谢您的注册使用...' },
          { subject: '哈哈啊哈啊', preview: '你知吗，啊哈哈哈哈哈' },
          // More emails...
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .main-content {
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
  .email-list li .subject {
    font-weight: bold;
  }
  .email-list li .preview {
    color: #666;
  }
  </style>
  