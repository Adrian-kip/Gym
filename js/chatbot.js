document.addEventListener('DOMContentLoaded', function() {
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
    
    // Chatbot responses
    const botResponses = {
        greeting: ["Hello! How can I help you today?", "Hi there! What can I do for you?", "Welcome to Iron Peak! How can I assist you?"],
        membership: ["We offer several membership options: Basic ($49/mo), Premium ($79/mo), and Platinum ($99/mo).", "Our most popular plan is the Premium membership at $79/month which includes group classes."],
        hours: ["We're open 24/7 so you can work out whenever it's convenient for you!", "Our facility is open 24 hours a day, 7 days a week."],
        training: ["We have 45+ certified personal trainers specializing in various disciplines. Would you like to book a session?", "Our trainers can create customized programs based on your goals. The first session is free with Premium membership."],
        classes: ["We offer HIIT, Powerlifting, Yoga, Cycling, and more. Check our Services page for the full schedule.", "Group classes are included with Premium and Platinum memberships."],
        default: ["I'm not sure I understand. Could you rephrase that?", "I'm still learning. Can you ask about memberships, classes, or personal training?"]
    };
    
    // Quick replies
    const quickReplies = {
        "Membership Plans": "membership",
        "Class Schedule": "classes",
        "Personal Training": "training"
    };
    
    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate bot response
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();
        
        if (userMessage.includes('hi') || userMessage.includes('hello')) {
            return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
        } else if (userMessage.includes('membership') || userMessage.includes('price') || userMessage.includes('cost')) {
            return botResponses.membership[Math.floor(Math.random() * botResponses.membership.length)];
        } else if (userMessage.includes('hour') || userMessage.includes('open') || userMessage.includes('time')) {
            return botResponses.hours[Math.floor(Math.random() * botResponses.hours.length)];
        } else if (userMessage.includes('trainer') || userMessage.includes('coach') || userMessage.includes('personal')) {
            return botResponses.training[Math.floor(Math.random() * botResponses.training.length)];
        } else if (userMessage.includes('class') || userMessage.includes('schedule') || userMessage.includes('group')) {
            return botResponses.classes[Math.floor(Math.random() * botResponses.classes.length)];
        } else {
            return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
        }
    }
    
    // Handle quick options
    document.querySelectorAll('.quick-option').forEach(option => {
        option.addEventListener('click', function() {
            const text = this.textContent;
            addMessage(text, true);
            
            // Remove quick options
            document.querySelectorAll('.quick-options').forEach(el => el.remove());
            
            // Get response based on quick option
            const responseType = quickReplies[text];
            if (responseType) {
                setTimeout(() => {
                    addMessage(botResponses[responseType][0]);
                }, 800);
            }
        });
    });
    
    // Send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse);
            }, 1000);
        }
    }
    
    // Send message on button click or Enter key
    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Show welcome message
    setTimeout(() => {
        chatbotContainer.classList.add('active');
    }, 3000);
});