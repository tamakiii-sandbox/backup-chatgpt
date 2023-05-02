// src/content.ts
import { observeChatContainer } from './observe';
import { browser } from 'webextension-polyfill-ts';

browser.runtime.sendMessage({ type: 'contentScriptLoaded' });

observeChatContainer();
