// src/observe.ts
import { Runtime, browser } from "webextension-polyfill-ts";

const chatContainerSelector = '.your_chat_container_selector_here'; // Replace with the correct selector for the chat container

export enum MessageType {
  GetDomElement = 'getDomElement',
}

interface Message {
  type: MessageType,
  payload?: any;
}

const getDomElement = async (message: Message) => {
  console.log('Get dom element:', message);
};

function startObserving(container: HTMLElement) {
  (window as any).yourContentScriptMarker = true;

  const observer = new MutationObserver((mutations) => {
    console.log('MutationObserver');
    return 'my-element';
    // mutations.forEach((mutation) => {
    //   if (mutation.type === 'childList') {
    //     const conversationData = extractConversationData(container);
    //     browser.runtime.sendMessage({ action: "saveConversation", data: conversationData });
    //   }
    // });
  });

  observer.observe(container, { childList: true, subtree: true });
  // // Handle potential errors when sending messages
  // browser.runtime.sendMessage({ action: "saveConversation", data: conversationData })
  //   .then((response) => {
  //     // Handle the response, if needed
  //     console.log('observe: handle response');
  //   })
  //   .catch((error) => {
  //     // Handle the error
  //     console.error('Error when sending message:', error);
  //   });
}

// export function extractConversationData(container: HTMLElement): any {
//   const messages = container.querySelectorAll('.message');
//   const conversationData = Array.from(messages).map((message) => {
//     const author = message.querySelector('.author')?.textContent;
//     const content = message.querySelector('.content')?.textContent;

//     return { author, content };
//   });

//   return conversationData;
// }

export function observe(selector: string) {
  const container = document.querySelector(selector);
  if (container) {
    startObserving(container as HTMLElement);
  }
}
