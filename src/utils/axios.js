import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://192.168.237.18:8080/api', // 确保指向正确的后端地址
    //baseURL: '/api', // 通过代理指向后端服务器
    timeout: 1800000, //30min确保发送大附件时不会超时
    withCredentials: true, // 确保发送凭证
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;