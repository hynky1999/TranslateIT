import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./App.css";
import type { Language, TranslateMessage } from './types';
import {languages, getByCode} from './languages';
import { useEffect, useState } from 'react';

const Popup = () => {
  const [sourceLanguage, setSourceLanguage] = useState<Language['code']>("auto");
  const [targetLanguage, setTargetLanguage] = useState<Language['code']>("en");


  const translate = async (src_lang: Language['code'], targ_lang: Language['code']) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id === undefined) return;
    const translateMessage: TranslateMessage = {
      sourceLanguage: getByCode(src_lang) || languages[0],
      targetLanguage: getByCode(targ_lang) || languages[0],
    };
    chrome.tabs.sendMessage(tab.id, {action: "translateSelectedText", message:translateMessage});
  };

  useEffect(() => {
    try {
      window.chrome.storage.sync.get({sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage}
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
      window.chrome.storage.sync.set({sourceLanguage });
    } catch (error) {
      console.log(error);
    }
  }, [sourceLanguage]);

  useEffect(() => {
    try {
      window.chrome.storage.sync.set({targetLanguage });
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
          <Button variant="primary" onClick={() => translate(sourceLanguage, targetLanguage) }>
            Translate
          </Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Popup;
