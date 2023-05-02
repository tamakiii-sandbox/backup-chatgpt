// src/background.ts
import { browser } from "webextension-polyfill-ts";
import { convertToMarkdown } from "./utils";

let activeContentScriptTabId: number | null = null;

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'contentScriptLoaded') {
    activeContentScriptTabId = sender.tab?.id || null;
  } else if (message.type === 'saveChatData' && activeContentScriptTabId) {
    browser.tabs.sendMessage(activeContentScriptTabId, message);
  }
});


browser.runtime.onMessage.addListener((request, sender) => {
  if (request.action === "saveConversation") {
    const data = request.data;
    saveAsMarkdown(data);
    saveAsJson(data);
  }
});

function saveAsJson(data: any): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: url,
    filename: `conversation-${new Date().toISOString()}.json`
  });
}

function saveAsMarkdown(data: any): void {
  const markdown = convertToMarkdown(data);
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: url,
    filename: `conversation-${new Date().toISOString()}.md`
  });
}

