
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

//    1. ORIGINAL DOUBLE CLICK LOGIC (Tooltip)
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
    tooltip.style.left = (x + window.scrollX) + 'px';
    tooltip.style.top = (y + window.scrollY - 40) + 'px';
    setTimeout(() => { if (tooltip) tooltip.classList.remove('show'); }, 3000);
}


//    2. INLINE TRANSLATE ICON & ADVANCED POPUP LOGIC
let selectionIcon = null;
let inlinePopup = null;
let translateDebounce = null;

// Close custom dropdowns if clicking outside them
document.addEventListener('click', (e) => {
    if (!e.target.closest('.trans-custom-select')) {
        document.querySelectorAll('.trans-custom-select').forEach(el => el.classList.remove('active'));
    }
});

document.addEventListener("mouseup", (e) => {
    if (!chrome.runtime?.id) return;

    // Ignore clicks inside our UI
    if (e.target.closest('#trans-selection-icon') || e.target.closest('#trans-inline-popup')) return;

    removeIcon();
    removeInlinePopup();

    setTimeout(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();

        // Show icon for paragraphs (more than 1 word)
        if (text.length > 0 && text.split(/\s+/).length > 1) {
            createSelectionIcon(selection);
        }
    }, 10);
});

function createSelectionIcon(selection) {
    if (!selectionIcon) {
        selectionIcon = document.createElement("div");
        selectionIcon.id = "trans-selection-icon";
        selectionIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="998.1" height="998.3" viewBox="0 0 998.1 998.3"><path fill="#dbdbdb" d="M931.7 998.3c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4H283.6l260.1 797.9z"/><path fill="#dcdcdc" d="M931.7 230.4c9.7 0 18.9 3.8 25.8 10.6 6.8 6.7 10.6 15.5 10.6 24.8v667.1c0 9.3-3.7 18.1-10.6 24.8-6.9 6.8-16.1 10.6-25.8 10.6H565.5L324.9 230.4zm0-30H283.6l260.1 797.9h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4"/><path fill="#572e27" d="m482.3 809.8 61.4 188.5 170.7-188.5z"/><path fill="#ad5c31" d="M936.1 476.1V437H747.6v-63.2h-61.2V437H566.1v39.1h239.4c-12.8 45.1-41.1 87.7-68.7 120.8-48.9-57.9-49.1-76.7-49.1-76.7h-50.8s2.1 28.2 70.7 108.6c-22.3 22.8-39.2 36.3-39.2 36.3l15.6 48.8s23.6-20.3 53.1-51.6c29.6 32.1 67.8 70.7 117.2 116.7l32.1-32.1c-52.9-48-91.7-86.1-120.2-116.7 38.2-45.2 77-102.1 85.2-154.2H936v.1z"/><path fill="#ad5c31" d="M66.4 0C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h648.1L454.4 0z"/><linearGradient id="a" x1="534.3" x2="998.1" y1="433.2" y2="433.2" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".02"/></linearGradient><path fill="url(#a)" d="M534.3 200.4h397.4c36.5 0 66.4 29.4 66.4 65.4V666z"/><path fill="#fff" d="M371.4 430.6c-2.5 30.3-28.4 75.2-91.1 75.2-54.3 0-98.3-44.9-98.3-100.2s44-100.2 98.3-100.2c30.9 0 51.5 13.4 63.3 24.3l41.2-39.6c-27.1-25-62.4-40.6-104.5-40.6-86.1 0-156 69.9-156 156s69.9 156 156 156c90.2 0 149.8-63.3 149.8-152.6 0-12.8-1.6-22.2-3.7-31.8h-146v53.4z"/><radialGradient id="b" cx="65.208" cy="19.366" r="1398.271" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><path fill="url(#b)" d="M931.7 200.4H518.8L454.4 0h-388C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h415.9l61.4 188.4h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4"/></svg>
        `;

        selectionIcon.addEventListener("click", () => {
            const text = window.getSelection().toString().trim();
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            openInlinePopup(text, rect);
            removeIcon();
        });
        document.body.appendChild(selectionIcon);
    }

    const rect = selection.getRangeAt(0).getBoundingClientRect();
    selectionIcon.style.top = (rect.bottom + window.scrollY + 5) + "px";

    let leftPos = rect.right + window.scrollX;
    if (leftPos + 30 > window.innerWidth) leftPos = window.innerWidth - 40;
    selectionIcon.style.left = leftPos + "px";
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

    // Generate Dropdown Options
    let srcOptions = `<li data-val="auto">Detect Language</li>`;
    let tgtOptions = "";
    languages.forEach(lang => {
        srcOptions += `<li data-val="${lang.code}">${lang.name}</li>`;
        tgtOptions += `<li data-val="${lang.code}">${lang.name}</li>`;
    });

    inlinePopup.innerHTML = `
        <div class="trans-inline-header">
            <!-- Source Searchable Dropdown -->
            <div class="trans-custom-select" id="trans-inline-src">
                <div class="trans-select-btn" data-val="${sl}">${getLangName(sl)} <span>▼</span></div>
                <div class="trans-select-dropdown">
                    <input type="text" class="trans-search-box" placeholder="Search language...">
                    <ul class="trans-options-list">${srcOptions}</ul>
                </div>
            </div>
            
            <!-- Swap Icon Button -->
            <button class="trans-inline-swap" id="trans-inline-swap" title="Swap Languages">
                <svg viewBox="0 0 24 24"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/></svg>
            </button>
            
            <!-- Target Searchable Dropdown -->
            <div class="trans-custom-select" id="trans-inline-tgt">
                <div class="trans-select-btn" data-val="${tl}">${getLangName(tl)} <span>▼</span></div>
                <div class="trans-select-dropdown">
                    <input type="text" class="trans-search-box" placeholder="Search language...">
                    <ul class="trans-options-list">${tgtOptions}</ul>
                </div>
            </div>
        </div>
        <div class="trans-inline-body">
            <textarea id="trans-inline-source" class="trans-inline-textarea">${text}</textarea>
            <textarea id="trans-inline-target" class="trans-inline-textarea" readonly></textarea>
        </div>
    `;

    document.body.appendChild(inlinePopup);

    // Positioning
    let topPos = rect.bottom + window.scrollY + 10;
    let leftPos = rect.left + window.scrollX;
    if (leftPos + 360 > window.innerWidth) leftPos = window.innerWidth - 380;

    inlinePopup.style.top = topPos + "px";
    inlinePopup.style.left = leftPos + "px";

    // Element Bindings
    const srcBtn = inlinePopup.querySelector("#trans-inline-src .trans-select-btn");
    const tgtBtn = inlinePopup.querySelector("#trans-inline-tgt .trans-select-btn");
    const swapBtn = inlinePopup.querySelector("#trans-inline-swap");
    const sourceText = inlinePopup.querySelector("#trans-inline-source");
    const targetText = inlinePopup.querySelector("#trans-inline-target");

    // Translation Logic
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

    // Dropdown Setup Logic
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
                btn.innerHTML = `${e.target.textContent} <span>▼</span>`;
                btn.setAttribute('data-val', val);
                container.classList.remove('active');
                doTranslate();
            }
        };
    };

    bindDropdown("trans-inline-src");
    bindDropdown("trans-inline-tgt");

    // Swap Logic
    swapBtn.addEventListener("click", () => {
        const srcVal = srcBtn.getAttribute('data-val');
        if (srcVal === "auto") return;

        const tgtVal = tgtBtn.getAttribute('data-val');
        const srcTextStr = srcBtn.textContent.replace("▼", "").trim();
        const tgtTextStr = tgtBtn.textContent.replace("▼", "").trim();

        srcBtn.innerHTML = `${tgtTextStr} <span>▼</span>`;
        srcBtn.setAttribute('data-val', tgtVal);
        tgtBtn.innerHTML = `${srcTextStr} <span>▼</span>`;
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

    // Explicitly call the translation immediately after mounting the DOM
    setTimeout(doTranslate, 50);
}
