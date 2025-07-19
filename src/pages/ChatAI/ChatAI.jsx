import React, { useRef, useState, useEffect } from 'react';
import styles from './ChatAI.module.scss';
import sendIcon from '../../assets/images/send.png';
import botAvatar from '../../assets/images/App laucher.png';

const initialMessages = [
  { from: 'user', text: 'What is UI/UX Design?' },
  { from: 'bot', text: 'UI/UX stands for User Interface (UI) and User Experience (UX), two essential aspects of designing digital products such as websites, apps, and software.' }
];

export default function ChatAI() {
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Đây là câu trả lời mẫu cho: ' + input }]);
    }, 800);
  };

  const handleSidebarAction = (action) => {
    if (selectedIdx === null) return;
    if (action === 'delete') {
      setMessages(msgs => msgs.filter((_, idx) => idx !== selectedIdx));
      setSelectedIdx(null);
    }
    if (action === 'copy') {
      navigator.clipboard.writeText(messages[selectedIdx].text);
    }
    if (action === 'edit') {
      const newText = prompt('Edit message:', messages[selectedIdx].text);
      if (newText !== null) {
        setMessages(msgs => msgs.map((msg, idx) =>
          idx === selectedIdx ? { ...msg, text: newText } : msg
        ));
      }
    }
    // ...like, dislike, voice, v.v.
  };

  const handleRefresh = () => setMessages(initialMessages);

  return (
    <div className={styles.chatPageBg}>


      {/* Chat Layout */}
      <div className={styles.chatLayout}>
        <div className={styles.chatCard}>
          <div className={styles.botName}>SkillAI</div>
          <div className={styles.chatMain}>
            {messages.map((msg, idx) => {
              if (msg.from === 'bot') {
                // Tìm câu hỏi user gần nhất trước bot này
                let userQuestion = '';
                for (let i = idx - 1; i >= 0; i--) {
                  if (messages[i].from === 'user') {
                    userQuestion = messages[i].text;
                    break;
                  }
                }
                return (
                  <div key={idx} className={styles.botMsg}>
                    <div className={styles.botMsgHeader}>
                      <img src={botAvatar} className={styles.botAvatar} alt="Bot" />
                      <span className={styles.botMsgName}>{userQuestion}</span>
                    </div>
                    <div className={styles.botMsgContent}>
                      <span>{msg.text}</span>
                    </div>
                  </div>
                );
              }
              // Bubble user như cũ
              return (
                <div key={idx} className={styles.userMsg}>
                  <span>{msg.text}</span>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
          <form className={styles.chatInputBar} onSubmit={handleSend}>
            <input
              className={styles.chatInput}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything from here"
            />
            <button type="submit" className={styles.sendBtn}>
              <img src={sendIcon} alt="Send" style={{ width: 24, height: 24 }} />
            </button>
          </form>
        </div>
      </div>

      {/* Sidebar - nằm ngoài chatCard */}
      <div className={styles.chatSidebar}>
        <button className={styles.iconBtn} onClick={handleRefresh}><span role="img" aria-label="refresh"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw-icon lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span></button>
        <button className={styles.iconBtn}><span role="img" aria-label="like"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg></span></button>
        <button className={styles.iconBtn}><span role="img" aria-label="dislike"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg></span></button>
        <button className={styles.iconBtn}><span role="img" aria-label="copy"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-icon lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg></span></button>
        <button className={styles.iconBtn}><span role="img" aria-label="voice"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg></span></button>
      </div>
    </div>
  );
}
