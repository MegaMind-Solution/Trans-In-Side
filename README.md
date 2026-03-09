# 🌍 Trans-In-Side Chrome Extension

**Trans-In-Side** is a powerful, modern Chrome extension that brings seamless multi-language translation directly to your browser's side panel. With a beautifully crafted UI, dark mode support, and searchable language dropdowns, translating text while browsing has never been easier.

Developed by the **Tabbee Dev. Team** & **MegaMind-Solution**.

## ✨ Key Features

*   **⚡ Quick Side Panel Access**: View and translate content instantly without ever leaving your active tab.
*   **🔍 Smart Searchable Dropdowns**: Say goodbye to endless scrolling! Easily search and select from over **100+ supported languages** in a custom, beautifully animated dropdown menu.
*   **🌗 Real-Time Light/Dark Mode**: Toggle your theme directly from the extension popup. Watch the side panel instantly sync and switch themes in real-time without needing a page refresh.
*   **🎨 Premium Modern UI**: Built with pure CSS Flexbox, custom interactive star ratings (SVG), and Google's premium *Inter* font for a sleek, app-like experience.
*   **💾 Persistent Settings**: Your source language, target language, and theme preferences are automatically saved and synced via `chrome.storage.sync`.

## 🛠️ Installation

Since this is a custom Chrome Extension, you can easily install it locally in a few simple steps:

1. **Download the Code**: Clone this repository or download it as a ZIP file and extract it.
   ```bash
   git clone https://github.com/MegaMind-Solution/Trans-In-Side.git
   ```
2. **Open Extensions Page**: Open Google Chrome and navigate to `chrome://extensions/` in your URL bar.
3. **Enable Developer Mode**: Toggle the **"Developer mode"** switch in the top right corner.
4. **Load the Extension**: Click on the **"Load unpacked"** button and select the extracted folder containing the extension files.
5. **Pin It!**: Click the puzzle piece icon 🧩 in your Chrome toolbar and pin **Trans-In-Side** for quick access.

## 💻 How It Works

1. **Set Preferences (Popup)**: Click the extension icon in your Chrome toolbar. A modern popup will appear where you can:
   * Select your **Translate From** (or auto-detect) and **Translate To** languages using the searchable dropdowns.
   * Toggle the **Dark/Light Theme** switch.
2. **Open the Side Panel**: Once configured, trigger the Chrome Side Panel (via the Chrome side panel icon or extension shortcut).
3. **Enjoy Translating**: The translation interface will load perfectly inside the panel, respecting your exact theme and language choices.

## 📂 File Structure

*   `manifest.json` — Core extension configuration and permissions (`storage`, `sidePanel`).
*   `popup.html` & `popup.js` — The modern settings menu (Theme toggle & Searchable language dropdowns).
*   `panel.html` & `panel.js` — The main side panel view that houses the translation frame and the real-time theme listener.

## ❤️ Rate Us & Explore More

If you enjoy using Trans-In-Side, please consider rating us! The extension features a pure-CSS interactive star rating in the side panel footer. 

Explore more of our side panel extensions by clicking the **Explore All** link within the extension.

---
Created with ♥ by [**M Ramzan Ch**](https://github.com/MegaMind-Solution/Trans-In-Side)
