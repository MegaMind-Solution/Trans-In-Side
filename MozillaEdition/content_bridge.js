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

let tooltip = null;
const handleDblClick = async (e) => {
    try {
        if (!chrome.runtime?.id) {
            document.removeEventListener('dblclick', handleDblClick);
            return;
        }

        const selection = window.getSelection().toString().trim();
        if (!selection || selection.split(' ').length > 1) return;

        const res = await chrome.storage.sync.get(['tooltipEnabled', 'targetLang']);
        if (res.tooltipEnabled === false) return;

        const lang = res.targetLang || 'en';
        const translation = await chrome.runtime.sendMessage({
            action: 'translateWord',
            text: selection,
            lang: lang
        });

        if (translation) {
            showTooltip(e.clientX, e.clientY, translation, lang);
        }
    } catch (error) {
        if (error.message.includes('Extension context invalidated')) {
            console.log("Translate In Sidepanel: Context was invalidated. The event listener on this page has been removed. Please refresh the page to re-enable tooltips.");
            document.removeEventListener('dblclick', handleDblClick);
        } else {
            console.error("An unexpected error occurred in content_bridge.js:", error);
        }
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

    setTimeout(() => {
        if (tooltip) tooltip.classList.remove('show');
    }, 5000);
}