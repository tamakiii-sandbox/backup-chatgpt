// src/popup.ts
import { browser } from "webextension-polyfill-ts";

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save Conversation';
  saveButton.addEventListener('click', async () => {
    const activeTab = await browser.tabs.query({ active: true, currentWindow: true });
    if (activeTab[0].id) {
      browser.tabs.sendMessage(activeTab[0].id, { action: "saveConversation" });
    }
  });

  document.body.appendChild(saveButton);
});
