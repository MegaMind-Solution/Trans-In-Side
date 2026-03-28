const languages = [
    { code: "af", name: "Afrikaans" }, { code: "sq", name: "Albanian" }, { code: "am", name: "Amharic" },
    { code: "ar", name: "Arabic" }, { code: "hy", name: "Armenian" }, { code: "az", name: "Azerbaijani" },
    { code: "eu", name: "Basque" }, { code: "be", name: "Belarusian" }, { code: "bn", name: "Bengali" },
    { code: "bs", name: "Bosnian" }, { code: "bg", name: "Bulgarian" }, { code: "ca", name: "Catalan" },
    { code: "ceb", name: "Cebuano" }, { code: "zh-CN", name: "Chinese (Simplified)" }, { code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "co", name: "Corsican" }, { code: "hr", name: "Croatian" }, { code: "cs", name: "Czech" },
    { code: "da", name: "Danish" }, { code: "nl", name: "Dutch" }, { code: "en", name: "English" },
    { code: "eo", name: "Esperanto" }, { code: "et", name: "Estonian" }, { code: "fi", name: "Finnish" },
    { code: "fr", name: "French" }, { code: "fy", name: "Frisian" }, { code: "gl", name: "Galician" },
    { code: "ka", name: "Georgian" }, { code: "de", name: "German" }, { code: "el", name: "Greek" },
    { code: "gu", name: "Gujarati" }, { code: "ht", name: "Haitian Creole" }, { code: "ha", name: "Hausa" },
    { code: "haw", name: "Hawaiian" }, { code: "he", name: "Hebrew" }, { code: "hi", name: "Hindi" },
    { code: "hmn", name: "Hmong" }, { code: "hu", name: "Hungarian" }, { code: "is", name: "Icelandic" },
    { code: "ig", name: "Igbo" }, { code: "id", name: "Indonesian" }, { code: "ga", name: "Irish" },
    { code: "it", name: "Italian" }, { code: "ja", name: "Japanese" }, { code: "jv", name: "Javanese" },
    { code: "kn", name: "Kannada" }, { code: "kk", name: "Kazakh" }, { code: "km", name: "Khmer" },
    { code: "rw", name: "Kinyarwanda" }, { code: "ko", name: "Korean" }, { code: "ku", name: "Kurdish" },
    { code: "ky", name: "Kyrgyz" }, { code: "lo", name: "Lao" }, { code: "la", name: "Latin" },
    { code: "lv", name: "Latvian" }, { code: "lt", name: "Lithuanian" }, { code: "lb", name: "Luxembourgish" },
    { code: "mk", name: "Macedonian" }, { code: "mg", name: "Malagasy" }, { code: "ms", name: "Malay" },
    { code: "ml", name: "Malayalam" }, { code: "mt", name: "Maltese" }, { code: "mi", name: "Maori" },
    { code: "mr", name: "Marathi" }, { code: "mn", name: "Mongolian" }, { code: "my", name: "Myanmar (Burmese)" },
    { code: "ne", name: "Nepali" }, { code: "no", name: "Norwegian" }, { code: "ny", name: "Nyanja" },
    { code: "or", name: "Odia" }, { code: "ps", name: "Pashto" }, { code: "fa", name: "Persian" },
    { code: "pl", name: "Polish" }, { code: "pt", name: "Portuguese" }, { code: "pa", name: "Punjabi" },
    { code: "ro", name: "Romanian" }, { code: "ru", name: "Russian" }, { code: "sm", name: "Samoan" },
    { code: "gd", name: "Scots Gaelic" }, { code: "sr", name: "Serbian" }, { code: "st", name: "Sesotho" },
    { code: "sn", name: "Shona" }, { code: "sd", name: "Sindhi" }, { code: "si", name: "Sinhala" },
    { code: "sk", name: "Slovak" }, { code: "sl", name: "Slovenian" }, { code: "so", name: "Somali" },
    { code: "es", name: "Spanish" }, { code: "su", name: "Sundanese" }, { code: "sw", name: "Swahili" },
    { code: "sv", name: "Swedish" }, { code: "tl", name: "Tagalog" }, { code: "tg", name: "Tajik" },
    { code: "ta", name: "Tamil" }, { code: "tt", name: "Tatar" }, { code: "te", name: "Telugu" },
    { code: "th", name: "Thai" }, { code: "tr", name: "Turkish" }, { code: "tk", name: "Turkmen" },
    { code: "uk", name: "Ukrainian" }, { code: "ur", name: "Urdu" }, { code: "ug", name: "Uyghur" },
    { code: "uz", name: "Uzbek" }, { code: "vi", name: "Vietnamese" }, { code: "cy", name: "Welsh" },
    { code: "xh", name: "Xhosa" }, { code: "yi", name: "Yiddish" }, { code: "yo", name: "Yoruba" },
    { code: "zu", name: "Zulu" },
];

const fontMap = {
    arabic: ["ar", "ur", "fa", "ku", "ps", "sd", "ug", "yi"],
    hindi: ["hi", "mr", "ne", "sa", "bh"],
    latin: ["en", "es", "de", "fr", "it", "pt", "nl", "af", "sq", "ca", "da", "fi", "sv", "no", "is", "ga", "cy", "eu", "gl", "mt", "ro", "hu", "pl", "cs", "sk", "sl", "hr", "bs", "sr-Latn", "et", "lv", "lt", "tr", "az", "uz", "tk", "sw", "yo", "zu", "xh", "st", "tn", "ts", "ve", "ss", "nr", "id", "ms", "tl", "ceb", "la"]
};

function getFontClass(langCode) {
    if (fontMap.arabic.includes(langCode)) return 'font-arabic';
    if (fontMap.hindi.includes(langCode)) return 'font-hindi';
    return 'font-latin';
}

function getLangName(code) {
    if (code === 'auto') return 'Detect Language';
    const lang = languages.find(l => l.code === code);
    return lang ? lang.name : code;
}

/* =========================================================
   1. ORIGINAL DOUBLE CLICK LOGIC (Tooltip)
   ========================================================= */
let tooltip = null;

const handleDblClick = async (e) => {
    try {
        if (!chrome.runtime?.id) { document.removeEventListener('dblclick', handleDblClick); return; }
        if (e.target.closest('#trans-inline-popup')) return;

        const selection = window.getSelection().toString().trim();
        if (!selection || selection.split(/\s+/).length > 1) return;

        const res = await chrome.storage.sync.get(['tooltipEnabled', 'targetLang']);
        if (res.tooltipEnabled === false) return;

        const lang = res.targetLang || 'en';
        const translation = await chrome.runtime.sendMessage({
            action: 'translateWord', text: selection, lang: lang, srcLang: 'auto'
        });

        if (translation) showTooltip(e.clientX, e.clientY, translation, lang);
    } catch (error) {
        if (error.message.includes('Extension context invalidated')) document.removeEventListener('dblclick', handleDblClick);
    }
};

document.addEventListener('dblclick', handleDblClick);

function showTooltip(x, y, text, lang) {
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'trans-tooltip';
        document.body.appendChild(tooltip);
    }
    tooltip.className = '';
    tooltip.classList.add(getFontClass(lang), 'show');
    tooltip.textContent = text;

    let topPos = y + window.scrollY - 40;
    let leftPos = x + window.scrollX;

    if (topPos < window.scrollY + 5) topPos = y + window.scrollY + 20;

    tooltip.style.left = leftPos + 'px';
    tooltip.style.top = topPos + 'px';

    setTimeout(() => { if (tooltip) tooltip.classList.remove('show'); }, 3000);
}


/* =========================================================
   2. INLINE TRANSLATE ICON & ADVANCED POPUP LOGIC
   ========================================================= */
let selectionIcon = null;
let inlinePopup = null;
let translateDebounce = null;
let ignoreNextMouseUp = false;

document.addEventListener('click', (e) => {
    if (!e.target.closest('.trans-custom-select')) {
        document.querySelectorAll('.trans-custom-select').forEach(el => el.classList.remove('active'));
    }
});

document.addEventListener('mousedown', (e) => {
    if (!chrome.runtime?.id) return;
    if (e.target.closest('#trans-selection-icon') || e.target.closest('#trans-inline-popup')) return;

    removeIcon();
    removeInlinePopup();
});

document.addEventListener("mouseup", (e) => {
    if (!chrome.runtime?.id) return;

    if (ignoreNextMouseUp) return;

    if (e.target.closest('#trans-selection-icon') || e.target.closest('#trans-inline-popup')) return;

    setTimeout(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        if (text.length > 0 && text.split(/\s+/).length > 1) {
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            createSelectionIcon(text, rect);
        }
    }, 10);
});

function createSelectionIcon(text, rect) {
    if (!selectionIcon) {
        selectionIcon = document.createElement("div");
        selectionIcon.id = "trans-selection-icon";
        selectionIcon.className = "trans-selection-icon";
        selectionIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="998.1" height="998.3" viewBox="0 0 998.1 998.3"><path fill="#dbdbdb" d="M931.7 998.3c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4H283.6l260.1 797.9z"/><path fill="#dcdcdc" d="M931.7 230.4c9.7 0 18.9 3.8 25.8 10.6 6.8 6.7 10.6 15.5 10.6 24.8v667.1c0 9.3-3.7 18.1-10.6 24.8-6.9 6.8-16.1 10.6-25.8 10.6H565.5L324.9 230.4zm0-30H283.6l260.1 797.9h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4"/><path fill="#572e27" d="m482.3 809.8 61.4 188.5 170.7-188.5z"/><path fill="#ad5c31" d="M936.1 476.1V437H747.6v-63.2h-61.2V437H566.1v39.1h239.4c-12.8 45.1-41.1 87.7-68.7 120.8-48.9-57.9-49.1-76.7-49.1-76.7h-50.8s2.1 28.2 70.7 108.6c-22.3 22.8-39.2 36.3-39.2 36.3l15.6 48.8s23.6-20.3 53.1-51.6c29.6 32.1 67.8 70.7 117.2 116.7l32.1-32.1c-52.9-48-91.7-86.1-120.2-116.7 38.2-45.2 77-102.1 85.2-154.2H936v.1z"/><path fill="#ad5c31" d="M66.4 0C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h648.1L454.4 0z"/><linearGradient id="a" x1="534.3" x2="998.1" y1="433.2" y2="433.2" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".02"/></linearGradient><path fill="url(#a)" d="M534.3 200.4h397.4c36.5 0 66.4 29.4 66.4 65.4V666z"/><path fill="#fff" d="M371.4 430.6c-2.5 30.3-28.4 75.2-91.1 75.2-54.3 0-98.3-44.9-98.3-100.2s44-100.2 98.3-100.2c30.9 0 51.5 13.4 63.3 24.3l41.2-39.6c-27.1-25-62.4-40.6-104.5-40.6-86.1 0-156 69.9-156 156s69.9 156 156 156c90.2 0 149.8-63.3 149.8-152.6 0-12.8-1.6-22.2-3.7-31.8h-146v53.4z"/><radialGradient id="b" cx="65.208" cy="19.366" r="1398.271" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><path fill="url(#b)" d="M931.7 200.4H518.8L454.4 0h-388C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h415.9l61.4 188.4h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4"/></svg>`;

        selectionIcon.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();

            ignoreNextMouseUp = true;

            openInlinePopup(text, rect);
            removeIcon();

            setTimeout(() => { ignoreNextMouseUp = false; }, 200);
        });
        document.body.appendChild(selectionIcon);
    }

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let iconTop = rect.bottom + scrollY + 5;
    let iconLeft = rect.right + scrollX;

    if (iconLeft + 35 > scrollX + window.innerWidth) {
        iconLeft = scrollX + window.innerWidth - 40;
    }
    if (iconTop + 35 > scrollY + window.innerHeight) {
        iconTop = rect.top + scrollY - 35;
    }

    selectionIcon.style.top = iconTop + "px";
    selectionIcon.style.left = iconLeft + "px";
}

function removeIcon() {
    if (selectionIcon) { selectionIcon.remove(); selectionIcon = null; }
}

function removeInlinePopup() {
    if (inlinePopup) { inlinePopup.remove(); inlinePopup = null; }
}

async function openInlinePopup(text, rect) {
    removeInlinePopup();
    const settings = await chrome.storage.sync.get(['srcLang', 'targetLang']);
    const sl = settings.srcLang || 'auto';
    const tl = settings.targetLang || 'en';

    inlinePopup = document.createElement("div");
    inlinePopup.id = "trans-inline-popup";

    inlinePopup.innerHTML = `
        <div class="trans-inline-header">
            <div class="trans-custom-select" id="trans-inline-src">
                <div class="trans-select-btn"></div>
                <div class="trans-select-dropdown">
                    <input type="text" class="trans-search-box" placeholder="Search language...">
                    <ul class="trans-options-list"></ul>
                </div>
            </div>
            
            <button class="trans-inline-swap" id="trans-inline-swap" title="Swap Languages">⇆</button>
            
            <div class="trans-custom-select" id="trans-inline-tgt">
                <div class="trans-select-btn"></div>
                <div class="trans-select-dropdown alt">
                    <input type="text" class="trans-search-box" placeholder="Search language...">
                    <ul class="trans-options-list"></ul>
                </div>
            </div>
        </div>
        <div class="trans-inline-body">
            <textarea id="trans-inline-source" class="trans-inline-textarea"></textarea>
            <textarea id="trans-inline-target" class="trans-inline-textarea" readonly></textarea>
        </div>
        <div class="trans-inline-footer">
            <button id="trans-inline-copy" class="trans-inline-action-btn" title="Copy translation">
                <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> 
                Copy
            </button>
            <select id="trans-inline-search" class="trans-inline-action-select">
                <option value="" disabled selected>Search in...</option>
                <option value="https://www.google.com/search?q=">Google</option>
                <option value="https://www.google.com/search?udm=50&aep=11&q=">Google Ai</option>
                <option value="https://www.bing.com/search?q=">Bing</option>
                <option value="https://duckduckgo.com/?q=">DuckDuckGo</option>
                <option value="https://search.yahoo.com/search?p=">Yahoo</option>
            </select>
        </div>
    `;

    document.body.appendChild(inlinePopup);

    const srcBtn = inlinePopup.querySelector("#trans-inline-src .trans-select-btn");
    const tgtBtn = inlinePopup.querySelector("#trans-inline-tgt .trans-select-btn");
    const swapBtn = inlinePopup.querySelector("#trans-inline-swap");
    const sourceText = inlinePopup.querySelector("#trans-inline-source");
    const targetText = inlinePopup.querySelector("#trans-inline-target");
    const copyBtn = inlinePopup.querySelector("#trans-inline-copy");
    const searchSelect = inlinePopup.querySelector("#trans-inline-search");

    const setupBtn = (btn, val) => {
        btn.setAttribute('data-val', val);
        btn.textContent = getLangName(val) + ' ';
        const span = document.createElement('span');
        span.textContent = '▼';
        btn.appendChild(span);
    };

    setupBtn(srcBtn, sl);
    setupBtn(tgtBtn, tl);

    const srcList = inlinePopup.querySelector('#trans-inline-src .trans-options-list');
    const tgtList = inlinePopup.querySelector('#trans-inline-tgt .trans-options-list');

    const createLi = (code, name) => {
        const li = document.createElement('li');
        li.setAttribute('data-val', code);
        li.textContent = name;
        return li;
    };

    srcList.appendChild(createLi('auto', 'Detect Language'));
    languages.forEach(lang => {
        srcList.appendChild(createLi(lang.code, lang.name));
        tgtList.appendChild(createLi(lang.code, lang.name));
    });

    sourceText.value = text;

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let topPos = rect.bottom + scrollY + 10;
    let leftPos = rect.left + scrollX;

    if (leftPos + 380 > scrollX + window.innerWidth) leftPos = scrollX + window.innerWidth - 380;
    if (leftPos < scrollX + 10) leftPos = scrollX + 10;

    if (topPos + 240 > scrollY + window.innerHeight) {
        topPos = rect.top + scrollY - 240;
        if (topPos < scrollY + 10) topPos = scrollY + 10;
    }

    inlinePopup.style.top = topPos + "px";
    inlinePopup.style.left = leftPos + "px";

    let isCopied = false;
    copyBtn.addEventListener("click", () => {
        const textToCopy = targetText.value;
        if (!textToCopy || textToCopy === "Translating..." || isCopied) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            isCopied = true;
            const originalChildren = Array.from(copyBtn.childNodes);
            copyBtn.replaceChildren();

            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z");
            svg.appendChild(path);

            copyBtn.appendChild(svg);
            copyBtn.appendChild(document.createTextNode(" Copied!"));

            setTimeout(() => {
                copyBtn.replaceChildren(...originalChildren);
                isCopied = false;
            }, 1500);
        });
    });

    searchSelect.addEventListener("change", (e) => {
        const textToSearch = targetText.value;
        if (!e.target.value || !textToSearch || textToSearch === "Translating...") {
            e.target.selectedIndex = 0;
            return;
        }

        const searchUrl = e.target.value + encodeURIComponent(textToSearch);
        window.open(searchUrl, "_blank");
        e.target.selectedIndex = 0;
    });

    const doTranslate = async () => {
        const query = sourceText.value.trim();
        if (!query) { targetText.value = ""; return; }

        targetText.value = "Translating...";
        try {
            const translation = await chrome.runtime.sendMessage({
                action: 'translateWord',
                text: query,
                lang: tgtBtn.getAttribute("data-val"),
                srcLang: srcBtn.getAttribute("data-val")
            });
            targetText.value = translation || "Error translating.";

            targetText.className = "trans-inline-textarea " + getFontClass(tgtBtn.getAttribute("data-val"));
            sourceText.className = "trans-inline-textarea " + getFontClass(srcBtn.getAttribute("data-val"));

            chrome.storage.sync.set({ srcLang: srcBtn.getAttribute("data-val"), targetLang: tgtBtn.getAttribute("data-val") });
        } catch (e) {
            targetText.value = "Context invalidated. Please refresh page.";
        }
    };

    const bindDropdown = (containerId) => {
        const container = inlinePopup.querySelector(`#${containerId}`);
        const btn = container.querySelector('.trans-select-btn');
        const search = container.querySelector('.trans-search-box');
        const list = container.querySelector('.trans-options-list');

        btn.onclick = (e) => {
            e.stopPropagation();
            inlinePopup.querySelectorAll('.trans-custom-select').forEach(el => {
                if (el !== container) el.classList.remove('active');
            });
            container.classList.toggle('active');
            if (container.classList.contains('active')) {
                search.value = '';
                Array.from(list.children).forEach(li => li.style.display = 'block');
                setTimeout(() => search.focus(), 50);
            }
        };

        search.oninput = (e) => {
            const term = e.target.value.toLowerCase();
            Array.from(list.children).forEach(li => {
                li.style.display = li.textContent.toLowerCase().includes(term) ? 'block' : 'none';
            });
        };

        list.onclick = (e) => {
            if (e.target.tagName === 'LI') {
                const val = e.target.getAttribute('data-val');
                btn.textContent = `${e.target.textContent} `;
                const span = document.createElement('span');
                span.textContent = '▼';
                btn.appendChild(span);
                btn.setAttribute('data-val', val);
                container.classList.remove('active');
                doTranslate();
            }
        };
    };

    bindDropdown("trans-inline-src");
    bindDropdown("trans-inline-tgt");

    swapBtn.addEventListener("click", () => {
        const srcVal = srcBtn.getAttribute('data-val');
        if (srcVal === "auto") {
            const oldVal = targetText.value;
            targetText.value = "Cannot swap 'Detect Language'";
            setTimeout(() => { targetText.value = oldVal; }, 1500);
            return;
        }

        const tgtVal = tgtBtn.getAttribute('data-val');
        const srcTextStr = srcBtn.textContent.replace("▼", "").trim();
        const tgtTextStr = tgtBtn.textContent.replace("▼", "").trim();

        srcBtn.textContent = `${tgtTextStr} `;
        const span1 = document.createElement('span');
        span1.textContent = '▼';
        srcBtn.appendChild(span1);
        srcBtn.setAttribute('data-val', tgtVal);

        tgtBtn.textContent = `${srcTextStr} `;
        const span2 = document.createElement('span');
        span2.textContent = '▼';
        tgtBtn.appendChild(span2);
        tgtBtn.setAttribute('data-val', srcVal);

        const tempText = sourceText.value;
        sourceText.value = targetText.value;
        targetText.value = tempText;

        doTranslate();
    });

    sourceText.addEventListener("input", () => {
        clearTimeout(translateDebounce);
        translateDebounce = setTimeout(doTranslate, 600);
    });

    setTimeout(doTranslate, 50);
}