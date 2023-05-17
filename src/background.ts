import type { Language, TranslateMessage } from './types';
import { getLanguageByCode } from './languages';

chrome.runtime.onInstalled.addListener(() => {

  chrome.contextMenus.create({
    id: 'translateSelectedText',

    title: 'Translate Text',
    contexts: ['selection'],
  });


});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'translateSelectedText') {
    if (!tab || tab.id === undefined) return;
    const id = tab.id;


    const {srcLang: srcLang, trgLang: targLang} = await new Promise<{ srcLang: string,
      trgLang: string
    }>
    
    ((resolve) => {
      chrome.storage.sync.get({
        sourceLanguage: 'auto',
        targetLanguage: 'en',
      }, (items) => {
        resolve({
          srcLang: items.sourceLanguage,
          trgLang: items.targetLanguage,
        }
        );
      });
    });
    const translateMessage: TranslateMessage = {
      sourceLanguage: getLanguageByCode(srcLang) as Language,
      targetLanguage: getLanguageByCode(targLang) as Language,
    }


      chrome.tabs.sendMessage(id, { action: 'translateSelectedText', message: translateMessage});
  }
});