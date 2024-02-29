// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios'); // Assuming Axios is installed

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const OPENAI_API_KEY = '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';

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
  model: 'gpt-3.5-turbo',
  prompt: message,
  max_tokens: 150
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  }
});

      // Send generated response back to the client
      ws.send(response.data.choices[0].text);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  });
});

server.listen(3000, () => {
  console.log('WebSocket server running on port 3000');
});
