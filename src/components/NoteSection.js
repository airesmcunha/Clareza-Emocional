import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BotResponse from './BotResponse';

export default function NoteSection({ mood, onSave }) {
  const { t } = useTranslation();
  const [note, setNote] = useState('');
  const [showBot, setShowBot] = useState(false);
  const handleSave = () => {
    onSave(note, mood);
    setShowBot(true);
  };
  return (
    <div className="card">
      <h2>{t('note_title')}</h2>
      <textarea
        placeholder={t('note_placeholder')}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleSave} disabled={!note || !mood}>
        {t('save_note')}
      </button>
      {showBot && <BotResponse note={note} />}
    </div>
  );
}
