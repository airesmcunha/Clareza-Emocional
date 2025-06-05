import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const affirmationsList = [
  'Tenho o direito de sentir tudo o que estou a sentir.',
  'Não preciso decidir tudo agora – posso dar-me tempo.',
  'A minha paz interior vale mais do que manter uma relação incerta.',
  'Se for para ser, será com clareza e escolha mútua.',
  'Estou a aprender a amar-me ao mesmo tempo que cuido das minhas feridas.'
];

export default function Affirmation() {
  const { t } = useTranslation();
  const [affirmation, setAffirmation] = useState('');
  const generate = () => {
    const random = affirmationsList[Math.floor(Math.random() * affirmationsList.length)];
    setAffirmation(random);
  };
  return (
    <div className="card">
      <h2>{t('affirmation_title')}</h2>
      <button onClick={generate}>{t('generate_affirmation')}</button>
      <p><em>{affirmation}</em></p>
    </div>
  );
}
