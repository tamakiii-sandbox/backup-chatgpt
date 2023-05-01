// content.js

export const extractConversations = (container: HTMLElement) => {
  const messages = Array.from(container.querySelectorAll('.message'));
  return messages.map((message) => ({
    author: message.querySelector('.author')?.textContent,
    content: message.querySelector('.content')?.textContent
  }));
};


const observeChatContainer = () => {
  //
};

export default observeChatContainer;
