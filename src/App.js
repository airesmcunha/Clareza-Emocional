import React, { useState } from 'react';
import Chat from './components/Chat';

export default function App() {
  const [note, setNote] = useState('');
  const [messages, setMessages] = useState([]);

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const handleSend = async () => {
    if (!note) return;
    addMessage('user', note);
    setNote('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: note }] }),
      });
      const data = await response.json();
      addMessage('assistant', data.reply);
    } catch (err) {
      addMessage('assistant', 'Erro ao obter resposta.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Clareza Emocional</h1>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Escreve a tua nota" />
        <button onClick={handleSend}>Enviar</button>
      </div>
      <Chat messages={messages} />
    </div>
  );
}
