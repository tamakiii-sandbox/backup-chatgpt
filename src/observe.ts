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

const getDomElement = async (message: Message): Promise<string> => {
  console.log('Get dom element:', message);
  return 'response from getDomElement()';
};

function startObserving(container: HTMLElement) {
  console.log('startObserving');
  const observer = new MutationObserver((mutations) => {
    console.log('MutationObserver:', mutations);
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        console.log(container);
        // browser.runtime.sendMessage({ action: "saveConversation", data: conversationData });
      }
    });
    return 'return value from MutationObserver';
  });

  observer.observe(container, { childList: true, subtree: true });

  browser.runtime.onMessage.addListener(async (message: any, sender: Runtime.MessageSender): Promise<string|null> => {
    console.log('Observe: ', message, sender);
    switch (message.type) {
      case MessageType.GetDomElement:
        return await getDomElement(message);
      default:
        console.warn('Unknown message type:', message.type);
    }
    return null;
  });
}

export function observe(selector: string) {
  const container = document.querySelector(selector);
  console.log('contaienr:', container);
  if (container) {
    startObserving(container as HTMLElement);
  }
}
