import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Affirmation() {
  const { t, i18n } = useTranslation();
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
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
            { role: 'user', content: `Give me a short daily affirmation in ${i18n.language}` },
          ],
          max_tokens: 60,
        }),
      });
      const data = await res.json();
      setAffirmation(data.choices?.[0]?.message?.content.trim() || '');
    } catch (err) {
      console.error(err);
      setAffirmation('Error generating affirmation.');
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>{t('affirmation_title')}</h2>
      <button onClick={generate} disabled={loading}>
        {t('generate_affirmation')}
      </button>
      {loading ? <p>{t('loading')}</p> : <p><em>{affirmation}</em></p>}
    </div>
  );
}
