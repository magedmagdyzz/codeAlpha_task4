const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
  const chat = document.getElementById('chat');
  const message = document.createElement('div');
  message.textContent = event.data;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
};

document.getElementById('sendButton').addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();

  if (message !== '') {
    // Send message to the server (WebSocket)
    socket.send(message);

    // Update UI with user message
    const chat = document.getElementById('chat');
    const userMessage = document.createElement('div');
    userMessage.textContent = message;
    userMessage.classList.add('user-message');
    chat.appendChild(userMessage);
    chat.scrollTop = chat.scrollHeight;

    // Clear input field
    messageInput.value = '';
  }
});
