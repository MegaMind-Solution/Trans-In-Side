function updateTranslation() {
  chrome.storage.sync.get(['srcLang', 'targetLang'], (settings) => {
    chrome.storage.local.get(['lastQuery'], (data) => {
      const sl = settings.srcLang || 'auto';
      const tl = settings.targetLang || 'en';
      const text = data.lastQuery || '';

      const url = `https://translate.google.com/?sl=${sl}&tl=${tl}&text=${encodeURIComponent(text)}&op=translate`;
      document.getElementById('translateFrame').src = url;
    });
  });
}

updateTranslation();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.lastQuery) {
    updateTranslation();
  }
});

chrome.storage.sync.get(['theme'], (data) => {
  if (data.theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
});
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.theme) {
    if (changes.theme.newValue === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});
