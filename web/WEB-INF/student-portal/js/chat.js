const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const chatBody = document.getElementById('chatBody');

const appendMessage = (text, type = 'sent') => {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
};

const sendMessage = () => {
    const text = messageInput.value.trim();
    if (!text) return;
    appendMessage(text, 'sent');
    messageInput.value = '';

    setTimeout(() => {
        appendMessage('Thanks! Our team will respond shortly.', 'received');
    }, 800);
};

sendBtn?.addEventListener('click', sendMessage);
messageInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
