<template>
    <div class="inbox">
      <h2>Inbox</h2>
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [
          'Message 1',
          'Message 2',
          'Message 3'
        ]
      };
    }
  };
  </script>
  
  <style>
  .inbox {
    max-width: 600px;
    margin: 50px auto;
    padding: 2em;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
  }
  </style>
  