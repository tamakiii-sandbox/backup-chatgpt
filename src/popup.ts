import { getSavedConversations } from './content';

document.addEventListener('DOMContentLoaded', () => {
  const conversationList = document.getElementById('conversation-list');
  const exportButton = document.getElementById('export');

  if (exportButton) {
    exportButton.addEventListener('click', () => {
      console.log('hello');
    });
  }

  if (conversationList) {
    const conversations = getSavedConversations();
    conversations.forEach((conversation, index) => {
      const listItem = document.createElement('div');
      listItem.textContent = `Conversation ${index + 1}: ${conversation.messages.length} messages`;
      conversationList.appendChild(listItem);
    });
  }
});
