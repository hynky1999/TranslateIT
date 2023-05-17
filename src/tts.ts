import { AudioConfig, ResultReason, SpeechConfig, SpeechSynthesizer} from 'microsoft-cognitiveservices-speech-sdk';
import { getVoiceNameByLanguageCode } from './languages';
import { Language } from './types';

export async function runMicrosoftTTS(text: string, language: Language): Promise<void> {
    const speechKey = "91fc26787c88437ca6017156b1d54297";
    const serviceRegion = "eastus";

    const voice = getVoiceNameByLanguageCode(language.code);
    const voiceName = voice ? voice.name : undefined;

    const speechConfig = SpeechConfig.fromSubscription(speechKey, serviceRegion);
    const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
    speechConfig.speechSynthesisLanguage = language.name;
    if (voiceName){
        speechConfig.speechSynthesisVoiceName = voiceName;
    }

    const synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
        text,
        result => {
            if (result.reason === ResultReason.SynthesizingAudioCompleted) {
                // const audioData = result.audioData;
                // const audioBlob = new Blob([audioData], { type: 'audio/wav' });
                // const audioUrl = URL.createObjectURL(audioBlob);
                // const audio = new Audio(audioUrl);
                // audio.play();
            }
            synthesizer.close();
        },
        err => {
            console.log(`ERROR: ${err}`);
            synthesizer.close();
        }
    );
}