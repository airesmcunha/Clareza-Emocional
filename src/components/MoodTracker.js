import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const moods = ['😀', '🙂', '😐', '😔', '😣'];

export default function MoodTracker({ onMoodSelect }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (selected) onMoodSelect(selected);
  }, [selected, onMoodSelect]);
  return (
    <div className="card">
      <h2>{t('mood_title')}</h2>
      <div className="tracker">
        {moods.map((m, i) => (
          <span key={i} onClick={() => setSelected(m)} style={{ opacity: selected === m ? 1 : 0.5 }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
