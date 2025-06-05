import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BotResponse({ note }) {
  const { t, i18n } = useTranslation();
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'user', content: `Respond with empathy in ${i18n.language} to: ${note}` },
            ],
            max_tokens: 60,
          }),
        });
        const data = await res.json();
        setResponse(data.choices?.[0]?.message?.content.trim() || '');
      } catch (err) {
        console.error(err);
        setResponse('Erro ao gerar resposta.');
      }
      setLoading(false);
    };
    fetchResponse();
  }, [note, i18n.language]);

  return (
    <div className="card">
      <h3>ClarezaBot</h3>
      <p>{t('bot_disclaimer')}</p>
      {loading ? <p>{t('loading')}</p> : <p>{response}</p>}
    </div>
  );
}
