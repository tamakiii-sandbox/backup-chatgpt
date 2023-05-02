// src/observe.ts
import { browser } from "webextension-polyfill-ts";

const chatContainerSelector = '.your_chat_container_selector_here'; // Replace with the correct selector for the chat container

function startObserving(container: HTMLElement) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const conversationData = extractConversationData(container);
        browser.runtime.sendMessage({ action: "saveConversation", data: conversationData });
      }
    });
  });

  observer.observe(container, { childList: true, subtree: true });
}

export function observeChatContainer() {
  const chatContainer = document.querySelector(chatContainerSelector);
  if (chatContainer) {
    startObserving(chatContainer as HTMLElement);
  }
}

export function extractConversationData(container: HTMLElement): any {
  const messages = container.querySelectorAll('.message');
  const conversationData = Array.from(messages).map((message) => {
    const author = message.querySelector('.author')?.textContent;
    const content = message.querySelector('.content')?.textContent;

    return { author, content };
  });

  return conversationData;
}
