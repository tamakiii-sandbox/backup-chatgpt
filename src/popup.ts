// popup.ts
import { browser } from "webextension-polyfill-ts";

document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Conversation";
  saveButton.addEventListener("click", async () => {
    // Modify this part
    browser.runtime.sendMessage({ type: "saveChatData" })
      .then((response) => {
        // Handle response if necessary
        console.log(response);
        console.log('popup: handle response');
      })
      .catch((error) => {
        console.error("Error when sending message:", error);
      });
    return true;
  });
  document.body.appendChild(saveButton);

  browser.runtime.sendMessage({ type: "updateActiveTabId"});
});
