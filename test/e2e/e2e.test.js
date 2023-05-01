// e2e.test.js
const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

describe('OpenAI Chat Backup extension', () => {
  let browser;
  let context;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({ ignoreHTTPSErrors: true });
    page = await context.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should save and export conversations', async () => {
    // Load the popup.html file directly from the file system
    const extensionPath = await fs.realpath(path.join(__dirname, '../..'));
    const popupURL = `file://${extensionPath}/src/popup.html`;
    await page.goto(popupURL);

    // Click the "Export Conversations" button
    await page.click('#export');

    // Check if the exported JSON file has been downloaded
    // Note: You'll need to implement a mechanism to check the downloaded file
  }, 10000);
});
