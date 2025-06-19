   const token = ''; // Your Slack API token
const channelId = 'C017YL1NMU0'; // Your Slack channel ID

let filteredMessages = []; // Array to hold filtered messages
let currentMessageIndex = 0; // Index to keep track of the current message

async function fetchMessages() {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://slack.com/api/conversations.history?channel=${channelId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.ok) {
            displayFilteredMessages(data.messages);
        } else {
            console.error('Error fetching messages:', data.error);
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

function displayFilteredMessages(messages) {
    // Filter messages to only show those containing "PI"
    filteredMessages = messages.filter(message => message.text.includes("PI"));

    if (filteredMessages.length === 0) {
        document.getElementById('message').innerHTML = '<p>No messages containing "PI" found.</p>';
        document.getElementById('nextMessageButton').disabled = true; // Disable button if no messages
        return;
    }

    // Show the first message initially
    showMessage(0);
}

// Function to display the current message
function showMessage(index) {
    const messageContainer = document.getElementById('message');
    const message = filteredMessages[index];
    messageContainer.innerHTML = `<p>${message.text}</p>`;
}

// Event listener for the button
document.getElementById('nextMessageButton').addEventListener('click', () => {
    currentMessageIndex++;
    if (currentMessageIndex >= filteredMessages.length) {
        currentMessageIndex = 0; // Loop back to the first message
    }
    showMessage(currentMessageIndex);
});

// Fetch messages when the page loads
window.onload = fetchMessages;
