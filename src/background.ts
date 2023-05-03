// src/background.ts
import { Browser, Tabs, browser } from "webextension-polyfill-ts";
import * as Observe from './observe';

export enum MessageType {
  Save = 'save',
};

interface Message {
  type: MessageType,
  payload?: any;
}

const getCurrentActiveTab = async (browser: Browser): Promise<Tabs.Tab | null> => {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    if (tabs.length > 0) {
      return tabs[0];
    }
  } catch (error) {
    console.error("Error getting current active tab:", error);
  }
  return null;
};

const saveChatData = async (message: Message) => {
  console.log('save chat data:', message)
  console.log(browser.tabs);
  const tab = await getCurrentActiveTab(browser);
  if (tab && tab.id) {
    try {
      const id = tab.id;
      const response = await browser.tabs.sendMessage(id, {
        type: Observe.MessageType.GetDomElement,
      });
      console.log('response:', response);
    } catch (error) {
      console.warn('Caught error:', error);
    }
  }
};

browser.runtime.onMessage.addListener(async (message: Message) => {
  console.log('background:');

  switch (message.type) {
    case MessageType.Save:
      saveChatData(message);
      break;
    default:
      console.warn('Unknown message type:', message.type);
  }
});

// function saveAsJson(data: any): void {
//   const json = JSON.stringify(data, null, 2);
//   const blob = new Blob([json], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);

//   chrome.downloads.download({
//     url: url,
//     filename: `conversation-${new Date().toISOString()}.json`
//   });
// }

// function saveAsMarkdown(data: any): void {
//   const markdown = convertToMarkdown(data);
//   const blob = new Blob([markdown], { type: 'text/markdown' });
//   const url = URL.createObjectURL(blob);

//   chrome.downloads.download({
//     url: url,
//     filename: `conversation-${new Date().toISOString()}.md`
//   });
// }

