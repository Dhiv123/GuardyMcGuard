document.addEventListener('DOMContentLoaded', (event) => {
    const chatBody = document.getElementById('chat-body');
    const firstMessage = "Buckle up, buttercup! GuardyMcGuard here, your personal cybersecurity superhero with a cape made of firewalls! Think of me as a digital ninja with the reflexes of a squirrel hopped up on espresso, ready to thwart those cyber scoundrels! Got malware making your computer sound like a dial-up modem possessed by a banshee? Fear not, for I'm here! So, spill the digital tea! What cyber mystery needs solving today?";
    
    const guardyMessage = document.createElement('div');
    guardyMessage.classList.add('message', 'bot');
    guardyMessage.innerText = firstMessage;
    chatBody.appendChild(guardyMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
});

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');
    const messageText = chatInput.value.trim();

    if (messageText === '') {
        return;
    }

    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.innerText = messageText;
    chatBody.appendChild(userMessage);

    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: messageText })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        if (data.response) {
            botMessage.innerText = data.response;
        } else {
            botMessage.innerText = 'Oops! Something went wrong. Please try again later.';
        }


        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    })
     


    .catch(error => {
        console.error('Error:', error);
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        botMessage.innerText = 'Oops! Something went wrong. Please try again later.';
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    });
}
