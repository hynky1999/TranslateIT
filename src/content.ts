import type { Language, TranslateMessage } from './types';
async function translateSelectedText(source_language: Language, target_language: Language) {
  const selection = window.getSelection()
  const selectionText = selection?.toString().trim();
  const apiKey = "3a22aa87-f1c6-2d6f-e30e-982746f58ab8:fx"

  if (selection && selectionText) {
    try {
      const translatedText = await translateText(selectionText, source_language.code == 'auto' ? undefined : source_language.code , target_language.code , apiKey);
      console.log(translatedText);
      showTranslationPopup(selection, translatedText);
    } catch (error) {
      console.error('Translation error:', error);
    }
  }
}

async function translateText(text: string, sourceLanguage: string | undefined, targetLanguage: string, apiKey: string): Promise<string> {
  const apiUrl = 'https://api-free.deepl.com/v2/translate';
  const source_arg = sourceLanguage ? `&source_lang=${sourceLanguage}` : '';
  const target_arg = targetLanguage ? `&target_lang=${targetLanguage}` : '';


  const response = await fetch(`${apiUrl}?auth_key=${apiKey}&text=${encodeURIComponent(text)}${source_arg}${target_arg}`);

  if (!response.ok) {
    throw new Error(`Translation API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.translations[0].text;
}
function showTranslationPopup(selection: Selection | null, translatedText: string) {
  if (!selection || !selection.rangeCount) {
    return;
  }
  let viewport = window.visualViewport;
  if (viewport === null) {
    return;
  }

  // Create a popup container
  const popup = document.createElement('div');
  popup.style.position = 'absolute';
  popup.style.backgroundColor = '#f9f9f9';
  popup.style.border = '1px solid #ccc';
  popup.style.borderRadius = '5px';
  popup.style.padding = '10px';
  popup.style.zIndex = '9999';
  popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
  popup.style.fontFamily = 'Arial, sans-serif';
  popup.style.fontSize = '14px';
  popup.style.color = '#333';
  popup.style.lineHeight = '1.5';
  popup.style.maxWidth = '500px';

  // Add the translated text to the popup
  const textNode = document.createTextNode(translatedText);
  popup.appendChild(textNode);

  // Position the popup above the selected text
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  popup.style.left = `${rect.left + viewport.pageLeft}px`;
  console.log(popup.offsetHeight);

  // Add the popup to the DOM
  document.body.appendChild(popup);
  popup.style.top = `${rect.top + viewport.pageTop - popup.offsetHeight - 10}px`;

  // Close the popup when the user clicks outside of it
  document.addEventListener('mousedown', function closePopup(event) {
    if (!popup.contains(event.target as Node)) {
      document.body.removeChild(popup);
      document.removeEventListener('mousedown', closePopup);
    }
  });
}


// Receive the message with the translation language from the background script
chrome.runtime.onMessage.addListener((request) => {
  console.log('request', request);
  if (request.action !== 'translateSelectedText') return;
  const langMessage: TranslateMessage = request.message;
  console.log('langMessage', langMessage);
  translateSelectedText(langMessage.sourceLanguage, langMessage.targetLanguage);
});

