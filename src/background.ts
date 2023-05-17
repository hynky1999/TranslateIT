import type { Language, TTSMessage, TranslateMessage } from './types';
import { getLanguageByCode } from './languages';

chrome.runtime.onInstalled.addListener(() => {

  // Create a parent menu
  chrome.contextMenus.create({
    id: 'parent',
    title: 'TranslateIT',
    contexts: ['selection'],
  });

  // Create a child menu for translation
  chrome.contextMenus.create({
    id: 'translateSelectedText',
    parentId: 'parent',
    title: 'Translate Text',
    contexts: ['selection'],
  });

  // Create a child menu for text-to-speech
  chrome.contextMenus.create({
    id: 'ttsSelectedText',
    parentId: 'parent',
    title: 'Text to Speech',
    contexts: ['selection'],
  });


});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const tabId = tab?.id
  if (!tabId) {
    return;
  }
  if (info.menuItemId === 'translateSelectedText') {
    await resolveTranslate(tabId);
  }
  else if (info.menuItemId === 'ttsSelectedText') {
    await resolveTTS(tabId);
  }
});



async function resolveTranslate(tabId: number){
    const {srcLang, targLang } = await new Promise<{ srcLang: string,
      targLang: string
    }>
    
    ((resolve) => {
      chrome.storage.sync.get({
        sourceLanguage: 'auto',
        targetLanguage: 'en',
      }, (items) => {
        resolve({
          srcLang: items.sourceLanguage,
          targLang: items.targetLanguage,
        }
        );
      });
    });
    const translateMessage: TranslateMessage = {
      sourceLanguage: getLanguageByCode(srcLang) as Language,
      targetLanguage: getLanguageByCode(targLang) as Language,
    }


      chrome.tabs.sendMessage(tabId, { action: 'translateSelectedText', message: translateMessage});
  }

async function resolveTTS(tabId: number){
    const { srcLang } = await new Promise<{ srcLang: string }>
    
    ((resolve) => {
      chrome.storage.sync.get({
        sourceLanguage: 'auto',
      }, (items) => {
        resolve({
          srcLang: items.sourceLanguage,
        }
        );
      });
    });
    const ttsMessage = {
      language: getLanguageByCode(srcLang) as Language,
    } as TTSMessage;


      chrome.tabs.sendMessage(tabId, { action: 'ttsSelectedText', message: ttsMessage});
  }


