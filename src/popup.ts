import { getSavedConversations } from './content';

document.addEventListener('DOMContentLoaded', () => {
  const conversationList = document.getElementById('conversation-list');

  if (conversationList) {
    const conversations = getSavedConversations();
    conversations.forEach((conversation, index) => {
      const listItem = document.createElement('div');
      listItem.textContent = `Conversation ${index + 1}: ${conversation.messages.length} messages`;
      conversationList.appendChild(listItem);
    });
  }
});
