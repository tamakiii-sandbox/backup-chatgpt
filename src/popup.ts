// popup.ts
import { browser } from "webextension-polyfill-ts";
import { MessageType } from './background';

document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save Conversation';
  saveButton.addEventListener('click', async () => {
    browser.runtime.sendMessage({ type: MessageType.Save })
    return true;
  });
  document.body.appendChild(saveButton);
});
