const fontMap={
    arabic:["ar","ur","fa","ku","ps","sd","ug","yi"],
    hindi:["hi","mr","ne","sa","bh"],
    latin:["en","es","de","fr","it","pt","nl","af","sq","ca","da","fi","sv","no","is","ga","cy","eu","gl","mt","ro","hu","pl","cs","sk","sl","hr","bs","sr-Latn","et","lv","lt","tr","az","uz","tk","sw","yo","zu","xh","st","tn","ts","ve","ss","nr","id","ms","tl","ceb","la"]
};

function getFontClass(langCode) {
    if (fontMap.arabic.includes(langCode)) return 'font-arabic';
    if (fontMap.hindi.includes(langCode)) return 'font-hindi';
    return 'font-latin';
}

let tooltip = null;

document.addEventListener('dblclick', async (e) => {
    const selection = window.getSelection().toString().trim();
    if (!selection || selection.split(' ').length > 1) return;
    chrome.storage.sync.get(['tooltipEnabled', 'targetLang'], async (res) => {
        if (res.tooltipEnabled === false) return;
        const lang = res.targetLang || 'en';
        const translation = await chrome.runtime.sendMessage({
            action: 'translateWord',
            text: selection,
            lang: lang
        });
        showTooltip(e.clientX, e.clientY, translation, lang);
    });
});
function showTooltip(x, y, text, lang) {
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'trans-tooltip';
        document.body.appendChild(tooltip);
    }
    // Clear old font classes and apply new one
    tooltip.className = '';
    tooltip.classList.add(getFontClass(lang), 'show');

    tooltip.textContent = text;
    tooltip.style.left = (x + window.scrollX) + 'px';
    tooltip.style.top = (y + window.scrollY - 40) + 'px';

    setTimeout(() => tooltip.classList.remove('show'), 3000);
}
