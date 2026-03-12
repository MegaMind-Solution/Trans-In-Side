
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translate-sidepanel",
        title: "Translate '%s' in Side Panel",
        contexts: ["selection"],
    });

    chrome.contextMenus.create({
        id: "read-aloud",
        title: "Listen '%s' By Aloud",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translate-sidepanel") {
        const text = info.selectionText;
        chrome.storage.local.set({ lastQuery: text }, () => {
            chrome.sidePanel.open({ windowId: tab.windowId });
        });
    }
    else if (info.menuItemId === "read-aloud") {
        const text = info.selectionText;
        chrome.tts.stop();
        chrome.tts.speak(text, { rate: 0.9 });
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.sidePanel.open({ windowId: tab.windowId });
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "translate-shortcut") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;
            const tab = tabs[0];

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => window.getSelection().toString()
            }).then((results) => {
                const text = results[0]?.result?.trim();
                if (text) {
                    chrome.storage.local.set({ lastQuery: text }, () => {
                        chrome.sidePanel.open({ windowId: tab.windowId });
                    });
                } else {
                    chrome.sidePanel.open({ windowId: tab.windowId });
                }
            }).catch(err => {
                chrome.sidePanel.open({ windowId: tab.windowId });
            });
        });
    }
});