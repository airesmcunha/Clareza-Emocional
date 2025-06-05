import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import Affirmation from './components/Affirmation';
import MoodTracker from './components/MoodTracker';
import NoteSection from './components/NoteSection';
import History from './components/History';

export default function App() {
  const { t } = useTranslation();
  const [mood, setMood] = useState(null);

  const saveRecord = (note, mood) => {
    const newRecord = { date: Date.now(), mood, note };
    const existing = JSON.parse(localStorage.getItem('records') || '[]');
    localStorage.setItem('records', JSON.stringify([newRecord, ...existing]));
  };

  return (
    <div className="container">
      <h1>{t('app_title')}</h1>
      <LanguageSelector />
      <Affirmation />
      <MoodTracker onMoodSelect={setMood} />
      <NoteSection mood={mood} onSave={saveRecord} />
      <History />
    </div>
  );
}
