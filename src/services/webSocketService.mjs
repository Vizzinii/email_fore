// src/services/webSocketService.mjs
import CryptoJs from 'crypto-js';
import base64 from 'base64-js';

const requestObj = {
    APPID: 'fba7d293',
    APISecret: 'MmMyYjVjZjhjYTRkMzc0MTJkNzlkZjEx',
    APIKey: '54849561cefcd910fd375df1686b66e4',
    Uid: 'jerry07210721',
    sparkResult: '',
    conversationHistory: []
}

// 构建鉴权URL
const getWebsocketUrl = () => {
    return new Promise((resolve, reject) => {
        let url = 'wss://spark-api.xf-yun.com/v1.1/chat';
        let host = 'spark-api.xf-yun.com';
        let apiKeyName = 'api_key';
        let date = new Date().toGMTString();
        let algorithm = 'hmac-sha256';
        let headers = 'host date request-line';
        let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
        let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, requestObj.APISecret);
        let signature = CryptoJs.enc.Base64.stringify(signatureSha);
        let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
        let authorization = base64.fromByteArray(new TextEncoder().encode(authorizationOrigin));
        url = `${url}?authorization=${authorization}&date=${encodeURIComponent(date)}&host=${host}`;
        resolve(url);
    });
};

// 发送消息
export const sendMsg = async (message) => {
    try {
        console.log("Connecting to WebSocket...");
        const myUrl = await getWebsocketUrl();
        let socket = new WebSocket(myUrl);
        requestObj.sparkResult = '';  // 清空之前的结果

        // 添加当前消息到历史记录
        requestObj.conversationHistory.push({ role: 'user', content: message });

        socket.addEventListener('open', (event) => {
            console.log('Connection opened:', event);
            let params = {
                header: {
                    app_id: requestObj.APPID,
                    uid: requestObj.Uid,
                },
                parameter: {
                    chat: {
                        domain: 'general',
                        temperature: 0.5,
                        max_tokens: 1024,
                    },
                },
                payload: {
                    message: {
                        text: requestObj.conversationHistory,
                    },
                },
            };
            socket.send(JSON.stringify(params));
        });

        socket.addEventListener('message', (event) => {
            let data = JSON.parse(event.data);
            console.log('Received message:', data);


            requestObj.sparkResult += data.payload.choices.text[0].content
            if (data.header.code !== 0) {
                console.log('Error:', data.header.code, data.header.message);
                socket.close();
            } else {
                if (data.payload.choices && data.payload.choices.text && data.payload.choices.text.length > 0) {
                    let newContent = data.payload.choices.text[0].content;
                    if (!requestObj.sparkResult.endsWith(newContent)) {
                        requestObj.sparkResult += newContent;
                        // 添加AI回复到历史记录
                        requestObj.conversationHistory.push({ role: 'assistant', content: newContent });
                    }
                }
                if (data.header.status === 2) {
                    //requestObj.sparkResult += data.payload.choices.text[0].content;
                    setTimeout(() => {
                        // "对话完成，手动关闭连接"
                        socket.close()
                    }, 1000)
                }
            }
        });

        socket.addEventListener('close', (event) => {
            console.log('Connection closed:', event);
        });

        socket.addEventListener('error', (event) => {
            console.error('Connection error:', event);
        });

        return new Promise((resolve, reject) => {
            socket.onclose = (event) => {
                console.log('WebSocket closed with result:', requestObj.sparkResult);
                resolve(requestObj.sparkResult);
            };
        });

    } catch (error) {
        console.error('WebSocket error:', error);
        throw error;
    }
};

// 清空对话历史
export const clearConversationHistory = () => {
    requestObj.conversationHistory = [];
};