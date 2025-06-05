import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function History() {
  const { t } = useTranslation();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('records') || '[]');
    setRecords(data);
  }, []);

  return (
    <div className="card">
      <h2>{t('history_title')}</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>{t('dates')}</th>
            <th>{t('mood')}</th>
            <th>{t('note')}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.mood}</td>
              <td>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
