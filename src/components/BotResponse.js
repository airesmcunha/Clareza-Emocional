import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BotResponse({ note }) {
  const { t } = useTranslation();
  const [response, setResponse] = useState('');

  useEffect(() => {
    async function fetchResponse() {
      try {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are an empathetic therapist bot.' },
              { role: 'user', content: note },
            ],
          }),
        });
        const data = await res.json();
        setResponse(data.choices?.[0]?.message?.content || '');
      } catch (err) {
        console.error('AI error', err);
        setResponse(`Entendo que digitas: "${note}". O que sentes é válido.`);
      }
    }
    fetchResponse();
  }, [note]);

  return (
    <div className="card">
      <h3>ClarezaBot</h3>
      <p>{t('bot_disclaimer')}</p>
      <p>{response}</p>
    </div>
  );
}
