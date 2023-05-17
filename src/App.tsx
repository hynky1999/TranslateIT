import { Container, Row, Col, Form, Button, ButtonGroup, Stack } from 'react-bootstrap';
import "./App.css";
import type { Language, TTSMessage, TranslateMessage } from './types';
import { languages, getLanguageByCode } from './languages';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

const Popup = () => {
  const [sourceLanguage, setSourceLanguage] = useState<Language['code']>("auto");
  const [targetLanguage, setTargetLanguage] = useState<Language['code']>("en");
  const translateMutation = useMutation({
    mutationFn: async ({ sourceLanguage, targetLanguage }: { sourceLanguage: Language['code'], targetLanguage: Language['code'] }) => {
      await translate(sourceLanguage, targetLanguage);
    }
  });
  const ttsMutation = useMutation({
    mutationFn: async ({ language }: { language: Language['code'] }) => {
      await runTTS(language);
    }
  });




  const translate = async (src_lang: Language['code'], targ_lang: Language['code']) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id === undefined) return;
    const translateMessage: TranslateMessage = {
      sourceLanguage: getLanguageByCode(src_lang) || languages[0],
      targetLanguage: getLanguageByCode(targ_lang) || languages[0],
    };
    // Only content scripts can access the page DOM, thus we can't get the selected text here.
    chrome.tabs.sendMessage(tab.id, { action: "translateSelectedText", message: translateMessage });
  };

  const runTTS = async (lang: Language['code']) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id === undefined) return;
    const ttsMessage: TTSMessage = {
      language: getLanguageByCode(lang) || languages[0],
    }
    chrome.tabs.sendMessage(tab.id, { action: "ttsSelectedText", message: ttsMessage });
  }

  useEffect(() => {
    try {
      window.chrome.storage.sync.get({
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage
      }
        , (items) => {
          setSourceLanguage(items.sourceLanguage);
          setTargetLanguage(items.targetLanguage);
        });
    }
    catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      window.chrome.storage.sync.set({ sourceLanguage });
    } catch (error) {
      console.log(error);
    }
  }, [sourceLanguage]);

  useEffect(() => {
    try {
      window.chrome.storage.sync.set({ targetLanguage });
    }
    catch (error) {
      console.log(error);
    }

  }, [targetLanguage]);





  return (
    <div className='fs-6 custom-popup'>
      <Container>
        <Row className="my-3">
          <Col>
            <Form.Label>Source Language</Form.Label>
            <Form.Select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value as Language['code'])}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.readableName}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Target Language</Form.Label>
            <Form.Select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value as Language['code'])}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.readableName}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
          <Stack direction="horizontal" gap={3}>
              <Button variant="primary" disabled={translateMutation.isLoading}
                onClick={() => translateMutation.mutate({ sourceLanguage, targetLanguage })
                }>
                Translate
              </Button>
              <Button variant="primary" disabled={ttsMutation.isLoading} onClick={() => ttsMutation.mutate({ language: targetLanguage })}>
                TTS
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Popup;
