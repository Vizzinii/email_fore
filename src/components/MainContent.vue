<template>
  <div class="main-content">
    <div class="chat-box">
      <div class="chat-header">
        <h3>欢迎使用皮卡鱼邮箱</h3>
      </div>
      <div class="chat-content" ref="chatContent">
        <div v-for="message in messages" :key="message.id" :class="{'user-message': message.user, 'bot-message': !message.user}">
          {{ message.text }}
        </div>
      </div>
      <div class="chat-input">
        <input v-model="userInput" @keydown.enter="sendMessage" placeholder="输入消息..." />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  data() {
    return {
      messages: [],
      userInput: ''
    };
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === '') return;
      const userMessage = {
        id: this.messages.length + 1,
        text: this.userInput,
        user: true
      };
      this.messages.push(userMessage);
      this.userInput = '';
      this.scrollToBottom();

      // Call the language model API
      try {
        const response = await this.callLanguageModelAPI(userMessage.text);
        const botMessage = {
          id: this.messages.length + 1,
          text: response.data.reply,
          user: false
        };
        this.messages.push(botMessage);
        this.scrollToBottom();
      } catch (error) {
        console.error('Error communicating with the language model:', error);
      }
    },
    async callLanguageModelAPI(message) {
      // Replace with actual API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { reply: '这是语言模型的回复' } });
        }, 1000);
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContent = this.$refs.chatContent;
        chatContent.scrollTop = chatContent.scrollHeight;
      });
    }
  }
};
</script>

<style scoped>
.main-content {
  flex-grow: 1;
  background: url('@/assets/img/background2.png') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  left: 15%;
  top: 60px;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-box {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  height: 75%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: rgba(0, 123, 255, 0.6);
  color: white;
  padding: 10px;
  text-align: center;
}

.chat-content {
  padding: 10px;
  flex-grow: 1;
  overflow-y: auto;
  max-height: 400px;
  display: flex;
  flex-direction: column;
}

.chat-content .user-message {
  background: #d9edf7;
  color: #31708f;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-self: flex-end;
  max-width: 70%;
  text-align: right; /* 右对齐文本 */
}

.chat-content .bot-message {
  background: #f7f7f7;
  color: #333;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-self: flex-start;
  max-width: 70%;
  text-align: left; /* 左对齐文本 */
}

.chat-input {
  display: flex;
  padding: 10px;
  background: #f1f1f1;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.chat-input button {
  margin-left: 10px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input button:hover {
  background: #0056b3;
}
</style>