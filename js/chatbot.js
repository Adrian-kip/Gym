// Chatbot functionality
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.getElementById('closeChatbot');
const sendMessageBtn = document.getElementById('sendMessage');
const userInput = document.getElementById('userInput');
const chatbotMessages = document.getElementById('chatbotMessages');

// Toggle chatbot visibility
chatbotBtn.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Send message function
const sendMessage = () => {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';
    
    // Bot response
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 500);
};

// Add message to chat
const addMessage = (message, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message', `${sender}-message`);
    
    const messageContent = document.createElement('p');
    messageContent.textContent = message;
    messageDiv.appendChild(messageContent);
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

// Get bot response based on user input
const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello there! How can I help you today at Masat Gym?";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return "We offer several membership options starting at $49/month. Would you like me to send you more details about our pricing?";
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
        return "Our gym is open 24/7 for premium members. Standard hours are 5AM-11PM on weekdays, with slightly reduced hours on weekends.";
    } else if (lowerMessage.includes('trainer') || lowerMessage.includes('dero')) {
        return "Dero is our head trainer with over 15 years of experience. He specializes in strength training and body transformations. Would you like to book a session with him?";
    } else if (lowerMessage.includes('equipment') || lowerMessage.includes('machines')) {
        return "We have top-of-the-line equipment from brands like Technogym and Life Fitness, including cardio machines, free weights, and functional training areas.";
    } else if (lowerMessage.includes('trial') || lowerMessage.includes('free')) {
        return "We offer a free 3-day trial for new members. You can sign up for it on our website or I can connect you with our staff to arrange it.";
    } else {
        return "I'm the Masat Gym assistant. For more specific questions, you can visit our website or I can connect you with our staff. How else can I help?";
    }
};

// Event listeners
sendMessageBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick option buttons
document.querySelectorAll('.quick-option').forEach(button => {
    button.addEventListener('click', () => {
        const optionText = button.textContent;
        addMessage(optionText, 'user');
        
        setTimeout(() => {
            const response = getBotResponse(optionText);
            addMessage(response, 'bot');
        }, 500);
    });
});