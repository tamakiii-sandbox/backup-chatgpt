// jest.setup.js
import { JSDOM } from 'jsdom';
const { window } = new JSDOM('');
global.MutationObserver = window.MutationObserver;

