export type Language = {
    readonly code: string;
    readonly name: string;
    readonly readableName: string;
}


export interface TranslateMessage {
    readonly sourceLanguage: Language;
    readonly targetLanguage: Language;
}
