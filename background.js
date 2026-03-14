
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translate-sidepanel",
        title: "Translate '%s' in Side Panel",
        contexts: ["selection"],
    });

    chrome.contextMenus.create({
        id: "read-aloud",
        title: "Listen to '%s'",
        contexts: ["selection"],
    });
});

// Function to handle translation request from any source (context menu, shortcut)
function requestTranslation(text, tab) {
    // Store text as an object with a timestamp to guarantee the `onChanged` event fires.
    const newQuery = {
        text: text,
        ts: Date.now()
    };
    chrome.storage.local.set({ lastQuery: newQuery }, () => {
        chrome.sidePanel.open({ windowId: tab.windowId });
    });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translate-sidepanel") {
        requestTranslation(info.selectionText, tab);
    } else if (info.menuItemId === "read-aloud") {
        chrome.tts.stop();
        chrome.tts.speak(info.selectionText, { rate: 0.9 });
    }
});

// REMOVED: chrome.action.onClicked.addListener
// (Removing this allows the default_popup in manifest.json to work normally!)

chrome.commands.onCommand.addListener((command) => {
    if (command === "translate-shortcut") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0]) return;
            const tab = tabs[0];

            // Open the panel immediately to respect the user gesture requirement.
            chrome.sidePanel.open({ windowId: tab.windowId }).then(() => {
                // Then, get the selected text and update storage. The panel will react to the change.
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => window.getSelection().toString()
                }).then((results) => {
                    const text = results[0]?.result?.trim();
                    if (text) {
                        chrome.storage.local.set({ lastQuery: { text: text, ts: Date.now() } });
                    }
                }).catch(err => {
                    // This error is expected on chrome:// pages or other protected URLs.
                    // We safely ignore it as the panel is already open and there is no text to get.
                });
            });
        });
    }
});

// Listener for the quick tooltip translation API call
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'translateWord') {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${request.lang}&dt=t&q=${encodeURIComponent(request.text)}`;
        fetch(url)
            .then(res => res.json())
            .then(data => sendResponse(data[0][0][0]))
            .catch(() => sendResponse("Translation error"));
        return true; // Indicates an asynchronous response.
    }
});