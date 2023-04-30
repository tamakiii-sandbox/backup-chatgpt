const extractConversations = () => {
  const messages = Array.from(document.querySelectorAll('.message'));
  return messages.map((message) => ({
    author: message.querySelector('.author').textContent,
    content: message.querySelector('.content').textContent
  }));
};

const saveConversations = (conversations) => {
  chrome.storage.local.set({ conversations }, () => {
    console.log('Conversations saved');
  });
};


const observer = new MutationObserver((mutations) => {
  const conversations = extractConversations();
	  saveConversations(conversations);
});

const config = { childList: true, subtree: true };

const chatContainer = document.querySelector('.conversation-container');
if (chatContainer) {
  observer.observe(chatContainer, config);
} else {
  console.error('Could not find conversation container');
}

