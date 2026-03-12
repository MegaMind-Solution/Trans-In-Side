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

const themeToggle = document.getElementById('themeToggle');
chrome.storage.sync.get(['theme'], (data) => {
  if (data.theme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.checked = true;
  }
});

themeToggle.addEventListener('change', (e) => {
  const isDark = e.target.checked;
  isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
});

let statusTimeout;
function showSavedStatus() {
  const statusEl = document.getElementById('statusMsg');
  statusEl.classList.add('show');
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => { statusEl.classList.remove('show'); }, 2000);
}

function setupDropdown(id, isSource, customOptions = null) {
  const container = document.getElementById(id);
  const button = container.querySelector('.select-button');
  const search = container.querySelector('.search-box');
  const list = container.querySelector('.options-list');

  let optionsHtml = '';
  if (customOptions) {
    customOptions.forEach(opt => { optionsHtml += `<li data-val="${opt.val}">${opt.name}</li>`; });
    if (search) search.style.display = 'none'; 
  } else {
    optionsHtml = isSource ? `<li  title="Detect Automaticly" data-val="auto">Detect Language</li>` : '';
    languages.forEach(lang => {
      optionsHtml += `<li  title="${lang.name}" data-val="${lang.code}">${lang.name}</li>`;
    });
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
  button.innerHTML = `${text} <span style="font-size:10px; color:var(--text-muted)">▼</span>`;
  button.setAttribute('data-val', val);
}

document.getElementById('swapLang').addEventListener('click', () => {
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

function saveSettings() {
  const providerBtn = document.querySelector('#providerSelect .select-button');

  chrome.storage.sync.set({
    srcLang: document.querySelector('#srcSelect .select-button').getAttribute('data-val'),
    targetLang: document.querySelector('#targetSelect .select-button').getAttribute('data-val'),
    provider: providerBtn ? providerBtn.getAttribute('data-val') : 'google'
  }, () => {
    showSavedStatus();
  });
}

function loadSettings() {
  chrome.storage.sync.get(['srcLang', 'targetLang', 'provider'], (data) => {
    if (data.srcLang) setDropdownValue('srcSelect', data.srcLang);
    if (data.targetLang) setDropdownValue('targetSelect', data.targetLang);
    if (data.provider) setDropdownValue('providerSelect', data.provider);
  });
}

function setDropdownValue(containerId, value) {
  const list = document.querySelector(`#${containerId} .options-list`);
  const button = document.querySelector(`#${containerId} .select-button`);
  if (!list || !button) return;
  const option = list.querySelector(`li[data-val="${value}"]`);
  if (option) {
    setButtonText(button, option.textContent, value);
  }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.custom-select')) {
    document.querySelectorAll('.custom-select').forEach(el => el.classList.remove('active'));
  }
});

setupDropdown('providerSelect', false, [
  { val: 'google', name: 'Google Translate' },
  { val: 'deepl', name: 'DeepL' },
  { val: 'bing', name: 'Bing Translator' }
]);
setupDropdown('srcSelect', true);
setupDropdown('targetSelect', false);
loadSettings();