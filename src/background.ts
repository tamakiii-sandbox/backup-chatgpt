// src/background.ts
import { Browser, browser } from "webextension-polyfill-ts";
import * as Observe from './observe';

export enum MessageType {
  Save = 'save',
};

interface Message {
  type: MessageType,
  payload?: any;
}

const getCurrentActiveTab = async (browser: Browser): Promise<browser.tabs.Tab | null> => {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });

    if (tabs.length > 0) {
      const activeTab = tabs[0];
      console.log("Current active tab:", activeTab);
      return activeTab;
    } else {
      console.warn("No active tab found");
      return null;
    }
  } catch (error) {
    console.error("Error getting current active tab:", error);
    return null;
  }
};

async function injectContentScript(tabId: number): Promise<void> {
  try {
    // Check if the content script has already been injected
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => typeof (window as any).yourContentScriptMarker === 'undefined'
    });

    if (results.length === 0) {
      throw new Error('Unable to get result from content script check');
    }

    if (results[0].result) {
      // Inject the content script if it's not already injected
      await chrome.scripting.executeScript({
        target: { tabId, allFrames: true },
        files: ['dist/content.js']
      });
    }
  } catch (error) {
    console.error('Error injecting content script:', error);
  }
}


// async function injectContentScript(tabId: number): Promise<void> {
//   try {
//     const results = await browser.scripting.executeScript({
//       target: {tabId: tabId, allFrames: true},
//       files: ['dist/content.js']
//     });
//     console.log(results);
//     // // Check if the content script has already been injected
//     // const results = await browser.tabs.executeScript(tabId, {
//     //   code: 'typeof yourContentScriptMarker === "undefined"',
//     // });

//     // if (results[0]) {
//     //   // Inject the content script if it's not already injected
//     //   await browser.tabs.executeScript(tabId, { file: 'dist/content.js' });
//     // }
//   } catch (error) {
//     console.error('Error injecting content script:', error);
//   }
// }


const saveChatData = async (message: Message) => {
  console.log('save chat data:', message)
  console.log(browser.tabs);
  const currentActiveTab = await getCurrentActiveTab(browser);
  // console.log('currentActiveTab:', currentActiveTab);
  if (currentActiveTab) {
    try {
      // const port = browser.tabs.connect(currentActiveTab.id, { name: 'background-to-content' });
      // port.postMessage(message);
      // port.disconnect();
      await injectContentScript(currentActiveTab.id);
      console.log('injected');

      const response = await browser.tabs.sendMessage(currentActiveTab.id, {
        type: Observe.MessageType.GetDomElement,
        // selector: selector,
      });
      console.log('response:', response);
    } catch (error) {
      console.log('Caught error:', error);
      console.log('currentActiveTab:', currentActiveTab);
    }
  }
};

browser.runtime.onMessage.addListener(async (message: Message) => {
  console.log('background:');

  switch (message.type) {
    case MessageType.Save:
      saveChatData(message);
    default:
      console.warn('Unknown message type:', message.type);
  }
});

// browser.runtime.onMessage.addListener(async (message) => {
//   console.log('updating activeContentScriptTabId');
//   if (message.type === 'updateActiveTabId') {
//     const tabs = await browser.tabs.query({ active: true, currentWindow: true });
//     if (tabs.length > 0) {
//       activeContentScriptTabId = tabs[0].id;
//     } else {
//       activeContentScriptTabId = null;
//     }
//   } else if (message.type === 'saveChatData' && activeContentScriptTabId) {
//     browser.tabs.sendMessage(activeContentScriptTabId, message);
//   }
//   return true;
// });

// browser.runtime.onMessage.addListener((message, sender) => {
//   if (message.type === 'contentScriptLoaded') {
//     activeContentScriptTabId = sender.tab?.id || null;
//   } else if (message.type === 'saveChatData' && activeContentScriptTabId) {
//     console.log(activeContentScriptTabId, message);
//     browser.tabs.sendMessage(activeContentScriptTabId, message);
//   }
// });

// browser.runtime.onMessage.addListener((request, sender) => {
//   if (request.action === "saveConversation") {
//     const data = request.data;
//     saveAsMarkdown(data);
//     saveAsJson(data);
//   }
// });

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

