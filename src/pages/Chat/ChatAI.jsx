import React, { useRef, useState, useEffect } from 'react';
import styles from './ChatAI.module.scss';

const BOT = {
  name: 'SkillAI',
  avatar: '/assets/avatar-placeholder.jpg',
  status: 'online',
};

export default function ChatAI() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Xin chào! Tôi là SkillAI, bạn cần hỗ trợ gì hôm nay?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(msgs => [
      ...msgs,
      { from: 'user', text: input },
      { from: 'bot', text: fakeBotReply(input) },
    ]);
    setInput('');
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  function fakeBotReply(userText) {
    // Giả lập trả lời, có thể thay bằng API sau
    if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('xin chào')) {
      return 'Chào bạn! Tôi có thể giúp gì cho bạn?';
    }
    if (userText.endsWith('?')) {
      return 'Đây là câu trả lời mẫu cho câu hỏi của bạn.';
    }
    return 'Tôi đã nhận được tin nhắn của bạn!';
  }

  return (
    <div className={styles.chatPage}>
      <div className={styles.header}>
        <img src={BOT.avatar} alt="Bot Avatar" className={styles.avatar} />
        <div>
          <div className={styles.botName}>{BOT.name}</div>
          <div className={styles.statusOnline}>● Online</div>
        </div>
      </div>
      <div className={styles.chatBody}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.from === 'user' ? styles.bubbleUser : styles.bubbleBot
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className={styles.inputRow}>
        <textarea
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Nhập tin nhắn..."
          rows={1}
        />
        <button className={styles.sendBtn} onClick={handleSend}>
          Gửi
        </button>
      </div>
    </div>
  );
} 