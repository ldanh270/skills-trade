import { useEffect, useState, useRef } from 'react';
import * as styles from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { fetchChats } from '~/api/api-chat';

function Avatar({ src, alt, fallback, className }) {
  return (
    <div className={`${styles.avatar} ${className || ''}`.trim()}>
      {src ? <img src={src} alt={alt} /> : <span>{fallback}</span>}
    </div>
  );
}

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    // Có thể khởi tạo bằng messages mẫu hoặc lấy từ API nếu muốn
  ]);
  const user = useSelector(state => state.user.user);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadChats = async () => {
      const chats = await fetchChats();
      setConversations(chats);
      if (chats.length > 0) setSelectedChat(chats[0].id);
    };
    loadChats();
  }, []);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        content: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    setInput('');
  };

    return (
    <div className={styles.ChatPage}>
      <div className={styles.main}>
        {/* Left Sidebar - Messages */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarHeaderTop}>
              <h2>Messages</h2>
              <div className={styles.sidebarHeaderIcons}>
                <button className={styles.iconBtn} title="Notifications" aria-label="Notifications">
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_138_1830" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="16">
                      <path d="M14 0H0V16H14V0Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_138_1830)">
                      <path d="M7.00001 0C6.44689 0 6.00001 0.446875 6.00001 1V1.6C3.71876 2.0625 2.00001 4.08125 2.00001 6.5V7.0875C2.00001 8.55625 1.45939 9.975 0.484387 11.075L0.253137 11.3344C-0.00936288 11.6281 -0.0718628 12.05 0.0875122 12.4094C0.246887 12.7688 0.606262 13 1.00001 13H13C13.3938 13 13.75 12.7688 13.9125 12.4094C14.075 12.05 14.0094 11.6281 13.7469 11.3344L13.5156 11.075C12.5406 9.975 12 8.55937 12 7.0875V6.5C12 4.08125 10.2813 2.0625 8.00001 1.6V1C8.00001 0.446875 7.55314 0 7.00001 0ZM8.41564 15.4156C8.79064 15.0406 9.00001 14.5312 9.00001 14H7.00001H5.00001C5.00001 14.5312 5.20939 15.0406 5.58439 15.4156C5.95939 15.7906 6.46876 16 7.00001 16C7.53126 16 8.04064 15.7906 8.41564 15.4156Z" fill="#6B7280"/>
                    </g>
                  </svg>
                </button>
                <button className={styles.iconBtn} title="User" aria-label="User">
                  <Avatar
                    src={user.avatar ? user.avatar : '/logo.png'}
                    alt={user.fullName || 'User'}
                    fallback={user.fullName ? user.fullName[0] : 'U'}
                    className={styles.avatarTiny}
                  />
                </button>
                <button className={styles.iconBtn} title="Settings" aria-label="Settings">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_138_1837" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <path d="M16 0H0V16H16V0Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_138_1837)">
                      <path d="M15.4969 5.20625C15.5969 5.47813 15.5126 5.78125 15.2969 5.975L13.9438 7.20625C13.9782 7.46563 13.9969 7.73125 13.9969 8C13.9969 8.26875 13.9782 8.53438 13.9438 8.79375L15.2969 10.025C15.5126 10.2188 15.5969 10.5219 15.4969 10.7937C15.3594 11.1656 15.1938 11.5219 15.0032 11.8656L14.8563 12.1187C14.6501 12.4625 14.4188 12.7875 14.1657 13.0938C13.9813 13.3188 13.6751 13.3937 13.4001 13.3062L11.6594 12.7531C11.2407 13.075 10.7782 13.3438 10.2844 13.5469L9.89381 15.3313C9.83131 15.6156 9.61256 15.8406 9.32506 15.8875C8.89381 15.9594 8.45006 15.9969 7.99693 15.9969C7.54381 15.9969 7.10006 15.9594 6.66881 15.8875C6.38131 15.8406 6.16256 15.6156 6.10006 15.3313L5.70943 13.5469C5.21568 13.3438 4.75318 13.075 4.33443 12.7531L2.59693 13.3094C2.32193 13.3969 2.01568 13.3188 1.83131 13.0969C1.57818 12.7906 1.34693 12.4656 1.14068 12.1219L0.993807 11.8687C0.803182 11.525 0.637557 11.1687 0.500057 10.7969C0.400057 10.525 0.484432 10.2219 0.700057 10.0281L2.05318 8.79688C2.01881 8.53438 2.00006 8.26875 2.00006 8C2.00006 7.73125 2.01881 7.46563 2.05318 7.20625L0.700057 5.975C0.484432 5.78125 0.400057 5.47813 0.500057 5.20625C0.637557 4.83438 0.803182 4.47813 0.993807 4.13438L1.14068 3.88125C1.34693 3.5375 1.57818 3.2125 1.83131 2.90625C2.01568 2.68125 2.32193 2.60625 2.59693 2.69375L4.33756 3.24688C4.75631 2.925 5.21881 2.65625 5.71256 2.45312L6.10318 0.66875C6.16568 0.384375 6.38443 0.159375 6.67193 0.1125C7.10318 0.0375 7.54693 0 8.00006 0C8.45318 0 8.89693 0.0375 9.32818 0.109375C9.61568 0.15625 9.83443 0.38125 9.89693 0.665625L10.2876 2.45C10.7813 2.65313 11.2438 2.92188 11.6626 3.24375L13.4032 2.69062C13.6782 2.60312 13.9844 2.68125 14.1688 2.90313C14.4219 3.20938 14.6532 3.53437 14.8594 3.87812L15.0063 4.13125C15.1969 4.475 15.3626 4.83125 15.5001 5.20312L15.4969 5.20625ZM8.00006 10.5C8.6631 10.5 9.29898 10.2366 9.76782 9.76777C10.2367 9.29893 10.5001 8.66304 10.5001 8C10.5001 7.33696 10.2367 6.70107 9.76782 6.23223C9.29898 5.76339 8.6631 5.5 8.00006 5.5C7.33702 5.5 6.70113 5.76339 6.23229 6.23223C5.76345 6.70107 5.50006 7.33696 5.50006 8C5.50006 8.66304 5.76345 9.29893 6.23229 9.76777C6.70113 10.2366 7.33702 10.5 8.00006 10.5Z" fill="#4B5563"/>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.sidebarSearchBox}>
              <span className={styles.searchIcon}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#9ca3af" strokeWidth="2"/><path d="M20 20L17 17" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <input className={styles.searchInput} placeholder="Search conversations..." />
            </div>
          </div>
          <div className={styles.conversationList}>
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`${styles.conversationItem} ${selectedChat === conv.id ? styles.activeConversation : ''}`}
                onClick={() => setSelectedChat(conv.id)}
              >
                <div className={styles.conversationAvatarBox}>
                  <Avatar src={conv.avatar} alt={conv.name} fallback={(conv.name || '').split(' ').map((n) => n[0]).join('')} />
                  {conv.id === 'leslie' && <span className={styles.onlineDot} />}
                </div>
                <div className={styles.conversationInfo}>
                  <div className={styles.conversationTop}>
                    <span className={styles.conversationName}>{conv.name}</span>
                    <span className={styles.conversationTime}>{conv.time}</span>
                  </div>
                  <span className={styles.conversationMsg}>{conv.message}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
        {/* Main Chat Area */}
        <main className={styles.chatMain}>
          {/* Chat Header */}
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>
              <div className={styles.conversationAvatarBox}>
                <Avatar src="/vite.svg?height=40&width=40" alt="Leslie Alexander" fallback="LA" />
                <span className={styles.onlineDot} />
              </div>
              <div>
                <span className={styles.chatName}>Leslie Alexander</span>
                <span className={styles.chatStatus}>Online</span>
              </div>
            </div>
            <div className={styles.chatHeaderActions}>
              <button className={styles.iconBtn} title="Call">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_138_1874)">
                    <mask id="mask0_138_1874" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                      <path d="M16 0H0V16H16V0Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_138_1874)">
                      <path d="M5.15312 0.768722C4.9125 0.187472 4.27812 -0.121903 3.67188 0.0437223L0.921875 0.793722C0.378125 0.943722 0 1.43747 0 1.99997C0 9.73122 6.26875 16 14 16C14.5625 16 15.0563 15.6218 15.2063 15.0781L15.9563 12.3281C16.1219 11.7218 15.8125 11.0875 15.2312 10.8468L12.2312 9.59685C11.7219 9.38435 11.1313 9.53122 10.7844 9.95935L9.52188 11.5C7.32188 10.4593 5.54063 8.6781 4.5 6.4781L6.04063 5.21872C6.46875 4.86872 6.61562 4.28122 6.40312 3.77185L5.15312 0.771847V0.768722Z" fill="#6B7280"/>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_138_1874">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button className={styles.iconBtn} title="Video">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4C0 2.89688 0.896875 2 2 2H10C11.1031 2 12 2.89688 12 4V12C12 13.1031 11.1031 14 10 14H2C0.896875 14 0 13.1031 0 12V4ZM17.4719 3.11875C17.7969 3.29375 18 3.63125 18 4V12C18 12.3687 17.7969 12.7063 17.4719 12.8813C17.1469 13.0563 16.7531 13.0375 16.4438 12.8313L13.4438 10.8313L13 10.5344V10V6V5.46562L13.4438 5.16875L16.4438 3.16875C16.75 2.96563 17.1437 2.94375 17.4719 3.11875Z" fill="#6B7280"/>
                </svg>
              </button>
              <button className={styles.iconBtn} title="More">
                <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 11.25C1.53587 11.25 1.09075 11.4344 0.762563 11.7626C0.434374 12.0908 0.25 12.5359 0.25 13C0.25 13.4641 0.434374 13.9092 0.762563 14.2374C1.09075 14.5656 1.53587 14.75 2 14.75C2.46413 14.75 2.90925 14.5656 3.23744 14.2374C3.56563 13.9092 3.75 13.4641 3.75 13C3.75 12.5359 3.56563 12.0908 3.23744 11.7626C2.90925 11.4344 2.46413 11.25 2 11.25ZM2 6.25C1.53587 6.25 1.09075 6.43437 0.762563 6.76256C0.434374 7.09075 0.25 7.53587 0.25 8C0.25 8.46413 0.434374 8.90925 0.762563 9.23744C1.09075 9.56563 1.53587 9.75 2 9.75C2.46413 9.75 2.90925 9.56563 3.23744 9.23744C3.56563 8.90925 3.75 8.46413 3.75 8C3.75 7.53587 3.56563 7.09075 3.23744 6.76256C2.90925 6.43437 2.46413 6.25 2 6.25ZM3.75 3C3.75 2.53587 3.56563 2.09075 3.23744 1.76256C2.90925 1.43437 2.46413 1.25 2 1.25C1.53587 1.25 1.09075 1.43437 0.762563 1.76256C0.434374 2.09075 0.25 2.53587 0.25 3C0.25 3.46413 0.434374 3.90925 0.762563 4.23744C1.09075 4.56563 1.53587 4.75 2 4.75C2.46413 4.75 2.90925 4.56563 3.23744 4.23744C3.56563 3.90925 3.75 3.46413 3.75 3Z" fill="#6B7280"/>
                </svg>
              </button>
            </div>
          </div>
          {/* Chat Messages */}
          <div className={styles.chatMessages}>
            {messages.map(msg => (
              <div key={msg.id} className={msg.sender === 'me' ? styles.messageRowRight : styles.messageRow}>
                <div className={msg.sender === 'me' ? styles.messageBubbleRight : styles.messageBubbleLeft}>
                  <p>{msg.content}</p>
                  <span className={msg.sender === 'me' ? styles.messageTimeRight : styles.messageTime}>{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Message Input */}
          <div className={styles.messageInputBox}>
            <button className={styles.iconBtn} title="Add">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <button className={styles.inputSendBtn} title="Send" onClick={handleSend}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="#2563eb"/>
                </svg>
              </button>
            </div>
          </div>
        </main>
        {/* Right Sidebar - Profile */}
        <aside className={styles.profileSidebar}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatarBox}>
              <Avatar src="/vite.svg?height=40&width=40" alt="LA" fallback="LA" className={styles.avatarLarge} />
              <span className={styles.onlineDotLarge} />
            </div>
            <span className={styles.profileName}>Leslie Alexander</span>
            <span className={styles.profileRole}>Web Designer</span>
            <div className={styles.profileStatusBox}>
              <span className={styles.onlineDotSmall} />
              <span className={styles.profileStatus}>Online</span>
            </div>
            <button className={styles.profileBtn}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#1f2937" strokeWidth="2"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#1f2937" strokeWidth="2"/><path d="M6 20c0-2.21 3.58-4 8-4s8 1.79 8 4" stroke="#1f2937" strokeWidth="2"/></svg>
              Profile
            </button>
          </div>
          <div className={styles.profileSearchBox}>
            <span className={styles.searchIcon}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="#9ca3af" strokeWidth="2"/><path d="M20 20L17 17" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <input className={styles.searchInput} placeholder="Search" />
          </div>
          <div className={styles.profileMediaBox}>
            <h4>Media & Files</h4>
            <div className={styles.mediaList}>
              <div className={styles.mediaItem}>
                <span className={styles.mediaIcon}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#6b7280" strokeWidth="2"/><path d="M8 16l2.5-3.5a1 1 0 0 1 1.6 0L16 16" stroke="#6b7280" strokeWidth="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="#6b7280"/></svg>
                </span>
                <div>
                  <span className={styles.mediaTitle}>Media Files</span>
                  <span className={styles.mediaDesc}>Photos, videos</span>
                </div>
              </div>
              <div className={styles.mediaItem}>
                <span className={styles.mediaIcon}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#6b7280" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="#6b7280" strokeWidth="2"/></svg>
                </span>
                <div>
                  <span className={styles.mediaTitle}>Documents</span>
                  <span className={styles.mediaDesc}>PDF, DOC, etc.</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.profileSettingsBox}>
            <h4>Settings</h4>
            <div className={styles.settingsList}>
              <div className={styles.settingsItem}>
                <span className={styles.settingsIcon}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="2"/><path d="M8 12h8" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
                <div>
                  <span className={styles.settingsTitle}>Change Theme</span>
                  <span className={styles.settingsDesc}>Default theme</span>
                </div>
                <span className={styles.chevronRight}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
              </div>
              <div className={styles.settingsItem}>
                <span className={styles.settingsIcon}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#6b7280" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="#6b7280" strokeWidth="2"/></svg>
                </span>
                <div>
                  <span className={styles.settingsTitle}>Edit Nickname</span>
                  <span className={styles.settingsDesc}>Leslie Alexander</span>
                </div>
                <span className={styles.chevronRight}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
              </div>
              <div className={styles.settingsItem}>
                <span className={styles.settingsIcon}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z" stroke="#6b7280" strokeWidth="2"/></svg>
                </span>
                <div>
                  <span className={styles.settingsTitle}>Notifications</span>
                  <span className={styles.settingsDesc}>Chat notifications</span>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.settingsItem}>
                <span className={styles.settingsIcon}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#6b7280" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="#6b7280" strokeWidth="2"/></svg>
                </span>
                <div>
                  <span className={styles.settingsTitle}>Message Permissions</span>
                  <span className={styles.settingsDesc}>Everyone can message</span>
                </div>
                <span className={styles.chevronRight}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
              </div>
              <div className={styles.settingsItem}>
                <span className={styles.settingsIcon}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="2"/><path d="M8 12h8" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
                <div>
                  <span className={styles.settingsTitle}>Auto-delete Messages</span>
                  <span className={styles.settingsDesc}>Disabled</span>
                </div>
                <span className={styles.chevronRight}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
        </div>
  );
}

export default Chat;
