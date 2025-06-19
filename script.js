const token = ''; // Replace with your Slack API token
const channelId = 'C017YL1NMU0'; // Slack channel ID

async function fetchMessages() {
    try {
        const response = await fetch(`https://slack.com/api/conversations.history?channel=${channelId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.ok) {
            displayMessages(data.messages);
        } else {
            console.error('Error fetching messages:', data.error);
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

function displayMessages(messages) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear previous messages

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `<p><strong>${message.user}</strong>: ${message.text}</p>`;
        messagesContainer.appendChild(messageDiv);
    });
}

// Fetch messages when the page loads
window.onload = fetchMessages;