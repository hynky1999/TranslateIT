import { Language } from "./types";

export const languages: Language[] = [
  { code: 'auto', name: '', readableName: 'Recognize' },
  { code: 'en', name: 'en-US', readableName: 'English' },
  { code: 'de', name: 'de-DE', readableName: 'German' },
  { code: 'nl', name: 'nl-NL', readableName: 'Dutch' },
  { code: 'es', name: 'es-ES', readableName: 'Spanish' },
  { code: 'cs', name: 'cs-CZ', readableName: 'Czech' },
];

export const getLanguageByCode = (code: string): Language | undefined => {
    return languages.find((language) => language.code === code);
}


export const languageToVoiceMap = [
  {code: 'auto', name: undefined},
  {code: 'en', name: 'en-US-AriaNeural'},
  {code: 'de', name: 'de-DE-KatjaNeural'},
  {code: 'nl', name: 'nl-NL-ColetteNeural'},
  {code: 'es', name: 'es-ES-ElviraNeural'},
  {code: 'cs', name: 'cs-CZ-VlastaNeural'},
];


export const getVoiceNameByLanguageCode = (code: string) => {
  return languageToVoiceMap.find((language) => language.code === code);
}