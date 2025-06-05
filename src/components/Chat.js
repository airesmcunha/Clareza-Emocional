import React from 'react';

export default function Chat({ messages }) {
  return (
    <div className="card chat">
      {messages.map((msg, idx) => (
        <div key={idx} className="chat-message">
          <strong>{msg.role === 'user' ? 'Tu:' : 'AI:'}</strong> {msg.content}
        </div>
      ))}
    </div>
  );
}
