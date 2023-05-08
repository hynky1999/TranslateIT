import { Language } from "./types";

export const languages: Language[] = [
  { code: 'auto', name: '', readableName: 'Recognize' },
  { code: 'en', name: 'en-US', readableName: 'English' },
  { code: 'de', name: 'de-DE', readableName: 'German' },
  { code: 'nl', name: 'nl-NL', readableName: 'Dutch' },
  { code: 'es', name: 'es-ES', readableName: 'Spanish' },
  { code: 'cs', name: 'cs-CZ', readableName: 'Czech' },
];

export const getByCode = (code: string): Language => {
    return languages.find((language) => language.code === code) || languages[0];
}