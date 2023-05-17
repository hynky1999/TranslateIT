import { showTranslationPopup, translateText } from "./translate";
import { runMicrosoftTTS } from "./tts";
import { TTSMessage, TranslateMessage } from "./types";



const getSelectionText = () => {
  const selection = window.getSelection()
  const selectionText = selection?.toString().trim();

  if (selection && selectionText) {
    return selectionText;
  }
  return undefined;
}

// Receive the message with the translation language from the background script
chrome.runtime.onMessage.addListener(async (request) => {
  console.log('request', request);
  if (request.action === 'translateSelectedText') {
    const langMessage = request.message as TranslateMessage;
    console.log('langMessage', langMessage);
    const selectionText = getSelectionText();
    if (selectionText) {
      const text = await translateText(selectionText, langMessage.sourceLanguage , langMessage.targetLanguage)
      showTranslationPopup(window.getSelection(), text);
    }
  }
  else if (request.action === 'ttsSelectedText') {
    const langMessage = request.message as TTSMessage;
    console.log('langMessage', langMessage);
    const selectionText = getSelectionText();
    if (selectionText) {
      runMicrosoftTTS(selectionText, langMessage.language);
    }
  }

  else {
    console.error('Unknown action:', request.action);
  }
});


