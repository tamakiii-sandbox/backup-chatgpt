// src/content.ts
import { observe } from './observe';
// import { Runtime, browser } from 'webextension-polyfill-ts';

// browser.runtime.onMessage.addListener((message: any, sender: Runtime.MessageSender) => {
//   console.log('Observe: ', message, sender);
// });

observe('body');
