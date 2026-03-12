const languages = [
  { code: 'af', name: 'Afrikaans' }, { code: 'sq', name: 'Albanian' }, { code: 'am', name: 'Amharic' },
  { code: 'ar', name: 'Arabic' }, { code: 'hy', name: 'Armenian' }, { code: 'az', name: 'Azerbaijani' },
  { code: 'eu', name: 'Basque' }, { code: 'be', name: 'Belarusian' }, { code: 'bn', name: 'Bengali' },
  { code: 'bs', name: 'Bosnian' }, { code: 'bg', name: 'Bulgarian' }, { code: 'ca', name: 'Catalan' },
  { code: 'ceb', name: 'Cebuano' }, { code: 'zh-CN', name: 'Chinese (Simplified)' }, { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'co', name: 'Corsican' }, { code: 'hr', name: 'Croatian' }, { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' }, { code: 'nl', name: 'Dutch' }, { code: 'en', name: 'English' },
  { code: 'eo', name: 'Esperanto' }, { code: 'et', name: 'Estonian' }, { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' }, { code: 'fy', name: 'Frisian' }, { code: 'gl', name: 'Galician' },
  { code: 'ka', name: 'Georgian' }, { code: 'de', name: 'German' }, { code: 'el', name: 'Greek' },
  { code: 'gu', name: 'Gujarati' }, { code: 'ht', name: 'Haitian Creole' }, { code: 'ha', name: 'Hausa' },
  { code: 'haw', name: 'Hawaiian' }, { code: 'he', name: 'Hebrew' }, { code: 'hi', name: 'Hindi' },
  { code: 'hmn', name: 'Hmong' }, { code: 'hu', name: 'Hungarian' }, { code: 'is', name: 'Icelandic' },
  { code: 'ig', name: 'Igbo' }, { code: 'id', name: 'Indonesian' }, { code: 'ga', name: 'Irish' },
  { code: 'it', name: 'Italian' }, { code: 'ja', name: 'Japanese' }, { code: 'jv', name: 'Javanese' },
  { code: 'kn', name: 'Kannada' }, { code: 'kk', name: 'Kazakh' }, { code: 'km', name: 'Khmer' },
  { code: 'rw', name: 'Kinyarwanda' }, { code: 'ko', name: 'Korean' }, { code: 'ku', name: 'Kurdish' },
  { code: 'ky', name: 'Kyrgyz' }, { code: 'lo', name: 'Lao' }, { code: 'la', name: 'Latin' },
  { code: 'lv', name: 'Latvian' }, { code: 'lt', name: 'Lithuanian' }, { code: 'lb', name: 'Luxembourgish' },
  { code: 'mk', name: 'Macedonian' }, { code: 'mg', name: 'Malagasy' }, { code: 'ms', name: 'Malay' },
  { code: 'ml', name: 'Malayalam' }, { code: 'mt', name: 'Maltese' }, { code: 'mi', name: 'Maori' },
  { code: 'mr', name: 'Marathi' }, { code: 'mn', name: 'Mongolian' }, { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'ne', name: 'Nepali' }, { code: 'no', name: 'Norwegian' }, { code: 'ny', name: 'Nyanja' },
  { code: 'or', name: 'Odia' }, { code: 'ps', name: 'Pashto' }, { code: 'fa', name: 'Persian' },
  { code: 'pl', name: 'Polish' }, { code: 'pt', name: 'Portuguese' }, { code: 'pa', name: 'Punjabi' },
  { code: 'ro', name: 'Romanian' }, { code: 'ru', name: 'Russian' }, { code: 'sm', name: 'Samoan' },
  { code: 'gd', name: 'Scots Gaelic' }, { code: 'sr', name: 'Serbian' }, { code: 'st', name: 'Sesotho' },
  { code: 'sn', name: 'Shona' }, { code: 'sd', name: 'Sindhi' }, { code: 'si', name: 'Sinhala' },
  { code: 'sk', name: 'Slovak' }, { code: 'sl', name: 'Slovenian' }, { code: 'so', name: 'Somali' },
  { code: 'es', name: 'Spanish' }, { code: 'su', name: 'Sundanese' }, { code: 'sw', name: 'Swahili' },
  { code: 'sv', name: 'Swedish' }, { code: 'tl', name: 'Tagalog' }, { code: 'tg', name: 'Tajik' },
  { code: 'ta', name: 'Tamil' }, { code: 'tt', name: 'Tatar' }, { code: 'te', name: 'Telugu' },
  { code: 'th', name: 'Thai' }, { code: 'tr', name: 'Turkish' }, { code: 'tk', name: 'Turkmen' },
  { code: 'uk', name: 'Ukrainian' }, { code: 'ur', name: 'Urdu' }, { code: 'ug', name: 'Uyghur' },
  { code: 'uz', name: 'Uzbek' }, { code: 'vi', name: 'Vietnamese' }, { code: 'cy', name: 'Welsh' },
  { code: 'xh', name: 'Xhosa' }, { code: 'yi', name: 'Yiddish' }, { code: 'yo', name: 'Yoruba' },
  { code: 'zu', name: 'Zulu' }
];

function updateTranslation() {
  chrome.storage.sync.get(['srcLang', 'targetLang', 'provider'], (settings) => {
    chrome.storage.local.get(['lastQuery'], (data) => {
      const sl = settings.srcLang || 'auto';
      const tl = settings.targetLang || 'en';
      const provider = settings.provider || 'google';
      const text = data.lastQuery || '';

      let url = '';

      // NEW: Generate Dynamic URL based on chosen engine
      if (provider === 'deepl') {
        url = text.trim() !== ''
          ? `https://www.deepl.com/translator#${sl}/${tl}/${encodeURIComponent(text)}`
          : `https://www.deepl.com/translator#${sl}/${tl}`;
      } else if (provider === 'bing') {
        const bsl = sl === 'auto' ? 'auto-detect' : sl;
        url = text.trim() !== ''
          ? `https://www.bing.com/translator?from=${bsl}&to=${tl}&text=${encodeURIComponent(text)}`
          : `https://www.bing.com/translator?from=${bsl}&to=${tl}`;
      } else {
        url = text.trim() !== ''
          ? `https://translate.google.com/?sl=${sl}&tl=${tl}&text=${encodeURIComponent(text)}&op=translate`
          : `https://translate.google.com/?sl=${sl}&tl=${tl}`;
      }

      document.getElementById('translateFrame').src = url;
      if (text.trim() !== '') saveToHistory(text, tl);
    });
  });
}

updateTranslation();

window.addEventListener('unload', () => {
  chrome.storage.local.set({ lastQuery: '' });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.lastQuery) {
    updateTranslation();
  }
  if (area === 'sync') {
    if (changes.theme) {
      const isDark = changes.theme.newValue === 'dark';
      isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
      if (themeTogglePanel) themeTogglePanel.checked = isDark;
    }
    if (changes.srcLang || changes.targetLang || changes.provider) {
      updateTranslation();
      loadSettings();
    }
  }
});

const dropOverlay = document.getElementById('dropOverlay');
window.addEventListener('dragover', (e) => { e.preventDefault(); dropOverlay.classList.add('active'); });
window.addEventListener('dragleave', (e) => { if (!e.relatedTarget) dropOverlay.classList.remove('active'); });
window.addEventListener('drop', (e) => {
  e.preventDefault();
  dropOverlay.classList.remove('active');
  const text = e.dataTransfer.getData('text/plain');
  if (text && text.trim() !== '') chrome.storage.local.set({ lastQuery: text.trim() });
});

const themeTogglePanel = document.getElementById('themeTogglePanel');
chrome.storage.sync.get(['theme'], (data) => {
  if (data.theme === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeTogglePanel) themeTogglePanel.checked = true;
  }
});

if (themeTogglePanel) {
  themeTogglePanel.addEventListener('change', (e) => {
    const isDark = e.target.checked;
    isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
  });
}

const settingsBtn = document.getElementById('settingsBtn');
const closeSettings = document.getElementById('closeSettings');
const settingsOverlay = document.getElementById('settingsOverlay');

if (settingsBtn && closeSettings && settingsOverlay) {
  settingsBtn.addEventListener('click', () => { settingsOverlay.classList.add('show'); });
  closeSettings.addEventListener('click', () => { settingsOverlay.classList.remove('show'); });
}

let statusTimeout;
function showSavedStatus() {
  const statusEl = document.getElementById('statusMsg');
  if (!statusEl) return;
  statusEl.classList.add('show');
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => { statusEl.classList.remove('show'); }, 2000);
}

function setupDropdown(id, isSource, customOptions = null) {
  const container = document.getElementById(id);
  if (!container) return;
  const button = container.querySelector('.select-button');
  const search = container.querySelector('.search-box');
  const list = container.querySelector('.options-list');

  let optionsHtml = '';
  if (customOptions) {
    customOptions.forEach(opt => { optionsHtml += `<li data-val="${opt.val}">${opt.name}</li>`; });
    if (search) search.style.display = 'none';
  } else {
    optionsHtml = isSource ? `<li title="Detect Automaticly" data-val="auto">Detect Language</li>` : '';
    languages.forEach(lang => { optionsHtml += `<li title="${lang.name}" data-val="${lang.code}">${lang.name}</li>`; });
  }

  list.innerHTML = optionsHtml;

  button.addEventListener('click', () => {
    document.querySelectorAll('.custom-select').forEach(el => { if (el !== container) el.classList.remove('active'); });
    container.classList.toggle('active');
    if (container.classList.contains('active') && search) {
      search.value = '';
      Array.from(list.children).forEach(li => li.style.display = 'block');
      setTimeout(() => search.focus(), 100);
    }
  });

  if (search) {
    search.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      Array.from(list.children).forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(term) ? 'block' : 'none';
      });
    });
  }

  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const val = e.target.getAttribute('data-val');
      const text = e.target.textContent;
      setButtonText(button, text, val);
      container.classList.remove('active');
      saveSettings();
    }
  });
}

function setButtonText(button, text, val) {
  if (!button) return;
  button.innerHTML = `${text} <span style="font-size:10px; color:var(--text-muted)">▼</span>`;
  button.setAttribute('data-val', val);
}

const swapLangBtn = document.getElementById('swapLang');
if (swapLangBtn) {
  swapLangBtn.addEventListener('click', () => {
    const srcBtn = document.querySelector('#srcSelect .select-button');
    const targetBtn = document.querySelector('#targetSelect .select-button');
    const srcVal = srcBtn.getAttribute('data-val');
    const targetVal = targetBtn.getAttribute('data-val');
    if (srcVal === 'auto') return;

    const srcText = srcBtn.textContent.replace('▼', '').trim();
    const targetText = targetBtn.textContent.replace('▼', '').trim();
    setButtonText(srcBtn, targetText, targetVal);
    setButtonText(targetBtn, srcText, srcVal);
    saveSettings();
  });
}

function saveSettings() {
  const srcBtn = document.querySelector('#srcSelect .select-button');
  const targetBtn = document.querySelector('#targetSelect .select-button');
  const providerBtn = document.querySelector('#providerSelect .select-button');

  if (!srcBtn || !targetBtn) return;
  chrome.storage.sync.set({
    srcLang: srcBtn.getAttribute('data-val'),
    targetLang: targetBtn.getAttribute('data-val'),
    provider: providerBtn ? providerBtn.getAttribute('data-val') : 'google'
  }, () => { showSavedStatus(); });
}

function loadSettings() {
  chrome.storage.sync.get(['srcLang', 'targetLang', 'provider'], (data) => {
    if (data.srcLang) setDropdownValue('srcSelect', data.srcLang);
    if (data.targetLang) setDropdownValue('targetSelect', data.targetLang);
    if (data.provider) setDropdownValue('providerSelect', data.provider);
  });
}

function setDropdownValue(containerId, value) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = container.querySelector('.options-list');
  const button = container.querySelector('.select-button');
  const option = list.querySelector(`li[data-val="${value}"]`);
  if (option) { setButtonText(button, option.textContent, value); }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-select')) {
    document.querySelectorAll('.custom-select').forEach(el => el.classList.remove('active'));
  }
});

// Setup New Dropdown + original ones
setupDropdown('providerSelect', false, [
  { val: 'google', name: 'Google Translate' },
  { val: 'deepl', name: 'DeepL' },
  { val: 'bing', name: 'Bing Translator' }
]);
setupDropdown('srcSelect', true);
setupDropdown('targetSelect', false);
loadSettings();

const historyBtn = document.getElementById('historyBtn');
const closeHistory = document.getElementById('closeHistory');
const historyOverlay = document.getElementById('historyOverlay');
const historyList = document.getElementById('historyList');
const emptyHistoryMsg = document.getElementById('emptyHistoryMsg');

if (historyBtn && closeHistory && historyOverlay) {
  historyBtn.addEventListener('click', () => { renderHistory(); historyOverlay.classList.add('show'); });
  closeHistory.addEventListener('click', () => { historyOverlay.classList.remove('show'); });
}

function saveToHistory(text, targetLangCode) {
  if (!text || text.trim() === '') return;

  const langObj = languages.find(l => l.code === targetLangCode);
  const targetLangName = langObj ? langObj.name : targetLangCode;

  chrome.storage.local.get(['translationHistory'], (data) => {
    let history = data.translationHistory || [];

    const existingIdx = history.findIndex(h => h.text === text && h.targetLangCode === targetLangCode);

    if (existingIdx !== -1) {
      const item = history.splice(existingIdx, 1)[0];
      item.date = Date.now();
      history.unshift(item);
    } else {
      history.unshift({
        id: Date.now(),
        text: text,
        targetLangCode: targetLangCode,
        targetLangName: targetLangName,
        isFavorite: false,
        date: Date.now()
      });
    }


    let nonFavorites = history.filter(h => !h.isFavorite);
    const favorites = history.filter(h => h.isFavorite);
    if (nonFavorites.length > 20) { nonFavorites = nonFavorites.slice(0, 20); }
    history = [...favorites, ...nonFavorites].sort((a, b) => b.date - a.date);
    chrome.storage.local.set({ translationHistory: history });
  });
}

function renderHistory() {
  chrome.storage.local.get(['translationHistory'], (data) => {
    const history = data.translationHistory || [];
    historyList.innerHTML = '';
    if (history.length === 0) {
      emptyHistoryMsg.style.display = 'block';
    } else {
      emptyHistoryMsg.style.display = 'none';
      history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';
        const starPath = item.isFavorite
          ? "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          : "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z";
        li.innerHTML = `
          <div class="history-text-wrap" title="${item.text}">
            <span class="history-text">${item.text}</span>
            <div class="history-meta"><span class="badge" title="Translate to &cl=var(--star-active);${item.targetLangName}&cl;">Translate to ${item.targetLangName}</span></div>
          </div>
          <button title="Add To Favorite" class="star-btn ${item.isFavorite ? 'active' : ''}" data-id="${item.id}">
            <svg viewBox="0 0 24 24"><path d="${starPath}"/></svg>
          </button>
        `;
        li.querySelector('.history-text-wrap').addEventListener('click', () => {
          chrome.storage.sync.set({ targetLang: item.targetLang }, () => {
            chrome.storage.local.set({ lastQuery: item.text }, () => { historyOverlay.classList.remove('show'); });
          });
        });
        li.querySelector('.star-btn').addEventListener('click', (e) => {
          e.stopPropagation(); toggleFavorite(item.id);
        });
        historyList.appendChild(li);
      });
    }
  });
}

function toggleFavorite(id) {
  chrome.storage.local.get(['translationHistory'], (data) => {
    let history = data.translationHistory || [];
    const idx = history.findIndex(h => h.id === id);
    if (idx > -1) {
      history[idx].isFavorite = !history[idx].isFavorite;
      chrome.storage.local.set({ translationHistory: history }, () => { renderHistory(); });
    }
  });
}