const exportBtn = document.getElementById('exportBtn');

const downloadData = (data, filename, type) => {
  const file = new Blob([data], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
};

exportBtn.addEventListener('click', () => {
  chrome.storage.local.get('conversations', (result) => {
    const conversations = result.conversations || [];
    const data = JSON.stringify(conversations, null, 2);
    downloadData(data, 'openai_chat_backup.json', 'application/json');
  });
});
