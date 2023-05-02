// test/unit/content.test.ts
import { extractConversationData } from '../../src/observe';

describe('extractConversationData', () => {
  test('should extract conversation data correctly', () => {
    document.body.innerHTML = `
      <div class="message">
        <div class="author">User</div>
        <div class="content">Hello, how are you?</div>
      </div>
      <div class="message">
        <div class="author">Assistant</div>
        <div class="content">I'm fine, thank you!</div>
      </div>
    `;

    const container = document.body;
    const expectedResult = [
      { author: 'User', content: 'Hello, how are you?' },
      { author: 'Assistant', content: "I'm fine, thank you!" }
    ];

    expect(extractConversationData(container)).toEqual(expectedResult);
  });
});
