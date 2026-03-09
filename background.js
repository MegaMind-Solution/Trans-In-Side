chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate-sidepanel",
    title: "Translate '%s' in Side Panel",
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
});

chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});
