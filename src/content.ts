// content.js

export const extractConversations = (container: HTMLElement) => {
  const messages = Array.from(container.querySelectorAll('.message'));
  return messages.map((message) => ({
    author: message.querySelector('.author')?.textContent,
    content: message.querySelector('.content')?.textContent
  }));
};

export const getSavedConversations = (): Array<any> => {
  return [];
};

const observeChatContainer = () => {
  // TODO: implement
};

export default observeChatContainer;
