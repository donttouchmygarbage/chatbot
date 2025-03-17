// Function to display messages in the chat container
function displayMessage(content, sender) {
    const chat = document.getElementById('chat');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + (sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.innerText = content;
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
  }
  
  // Function to send the message to the backend API and display responses
  async function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return; // Do nothing if the input is empty
  
    // Display the user's message in the chat window
    displayMessage(message, 'user');
    input.value = ''; // Clear the input
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      // Extract and display the bot's response
      const botResponse = data.choices && data.choices[0]?.message?.content || 'No response';
      displayMessage(botResponse, 'bot');
    } catch (error) {
      console.error('Error:', error);
      displayMessage('Error: Unable to reach the chatbot service.', 'bot');
    }
  }
  
  // Event listeners for sending messages
  document.getElementById('chatbot-send-btn').addEventListener('click', sendMessage);
  document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });