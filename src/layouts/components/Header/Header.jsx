    import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as styles from './Header.module.scss'
import { useSelector } from 'react-redux';

function Header() {
    const [navOpen, setNavOpen] = useState(false);
    const [iconsOpen, setIconsOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [fabOpen, setFabOpen] = useState(false);
    const fabMenuRef = useRef();
    useEffect(() => {
      if (!fabOpen) return;
      function handleClick(e) {
        if (fabMenuRef.current && !fabMenuRef.current.contains(e.target)) setFabOpen(false);
      }
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [fabOpen]);
    const handleNavToggle = () => setNavOpen((open) => !open);
    const handleIconsToggle = () => setIconsOpen((open) => !open);
    const handleNavClose = () => setNavOpen(false);
    const handleIconsClose = () => setIconsOpen(false);
    const handleNotificationClick = () => setShowNotification((show) => !show);
    const handleNotificationClose = () => setShowNotification(false);
    const navigate = useNavigate();

    // Demo state for animation
    const [isNewNotification, setIsNewNotification] = useState(false);
    const [isAIProcessing, setIsAIProcessing] = useState(false);
    // Demo: auto trigger shake every 5s
    useEffect(() => {
      const interval = setInterval(() => {
        setIsNewNotification(true);
        setTimeout(() => setIsNewNotification(false), 600);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
    // Demo: auto trigger spin every 7s
    useEffect(() => {
      const interval = setInterval(() => {
        setIsAIProcessing(true);
        setTimeout(() => setIsAIProcessing(false), 2000);
      }, 7000);
      return () => clearInterval(interval);
    }, []);

    const user = useSelector(state => state.user.user);

    return (
        <header className={styles['Header']}>
            <div className={styles['leftBox']}>
                <div className={styles['left']}>
                    <img src="/logo.png" alt="SkillsTrade Logo" className={styles['logo']} />
                    <span className={styles['title']}>SkillsTrade</span>
                </div>
                <nav className={styles['nav']}>
                    <Link to="/">Home</Link>
                    <Link to="/chat">Chat</Link>
                    <Link to="/transaction-history">Transaction history</Link>
                    <Link to="/about">About</Link>
                </nav>
                <button className={styles['hamburger']} onClick={handleNavToggle} aria-label="Menu">
                    <span className={styles['bar']}></span>
                    <span className={styles['bar']}></span>
                    <span className={styles['bar']}></span>
                </button>
            </div>
            <div className={styles['rightBox']}>
                <div className={styles['search']}>
                    <span className={styles['searchIcon']}>
                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_19_1049)">
                                <path d="M22.7192 21.364L16.999 15.6437C18.5578 13.7372 19.3242 11.3045 19.1397 8.84874C18.9552 6.39298 17.8339 4.10209 16.0076 2.44991C14.1814 0.797736 11.79 -0.0893151 9.32811 -0.0277597C6.8662 0.0337958 4.52213 1.03925 2.78075 2.78063C1.03937 4.522 0.0339179 6.86608 -0.0276376 9.32798C-0.0891931 11.7899 0.797858 14.1813 2.45003 16.0075C4.10221 17.8337 6.39311 18.9551 8.84886 19.1396C11.3046 19.3241 13.7374 18.5577 15.6439 16.9988L21.3642 22.7191C21.5449 22.8937 21.787 22.9903 22.0383 22.9881C22.2895 22.9859 22.5299 22.8851 22.7076 22.7074C22.8853 22.5298 22.986 22.2894 22.9882 22.0381C22.9904 21.7869 22.8938 21.5448 22.7192 21.364ZM9.58337 17.2499C8.06704 17.2499 6.58477 16.8003 5.324 15.9578C4.06322 15.1154 3.08056 13.9181 2.50029 12.5172C1.92002 11.1163 1.76819 9.57474 2.06401 8.08755C2.35983 6.60037 3.09001 5.2343 4.16222 4.16209C5.23442 3.08989 6.60049 2.35971 8.08768 2.06389C9.57486 1.76807 11.1164 1.9199 12.5173 2.50017C13.9182 3.08044 15.1155 4.0631 15.958 5.32387C16.8004 6.58465 17.25 8.06692 17.25 9.58325C17.2478 11.6159 16.4393 13.5646 15.002 15.0019C13.5647 16.4392 11.616 17.2476 9.58337 17.2499Z" fill="#65686C"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_19_1049">
                                    <rect width="23" height="23" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                    <input type="text" placeholder="Search" />
                </div>
                <div className={styles['iconGroup']}>
                    {/* Hiển thị icons chỉ trên desktop/tablet */}
                    {typeof window !== 'undefined' && window.innerWidth >= 600 && (
                        <div className={styles['icons']}>
                            <button className={styles['iconBtn']} title="Add" onClick={() => navigate('/upload')}><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="45" rx="22.5" fill="#E5E7EB"/>
<circle cx="22.5" cy="22.5" r="10.5" stroke="#65686C" strokeWidth="2"/>
<path d="M22.5 17V28" stroke="#65686C" strokeWidth="2" strokeLinecap="round"/>
<path d="M17 22L28 22" stroke="#65686C" strokeWidth="2" strokeLinecap="round"/>
</svg>
</button>
                        <button className={styles['iconBtn'] + (isAIProcessing ? ' ' + styles['spin'] : '')} title="AI" onClick={() => navigate('/chat-ai')}><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="45" rx="22.5" fill="#E5E7EB"/>
<path d="M18.291 31.824L13 33L14.176 27.709C13.4017 26.2603 12.9977 24.6426 13 23C13 17.477 17.477 13 23 13C28.523 13 33 17.477 33 23C33 28.523 28.523 33 23 33C21.3574 33.0023 19.7397 32.5983 18.291 31.824ZM18.581 29.711L19.234 30.061C20.3926 30.6799 21.6864 31.0025 23 31C24.5823 31 26.129 30.5308 27.4446 29.6518C28.7602 28.7727 29.7855 27.5233 30.391 26.0615C30.9965 24.5997 31.155 22.9911 30.8463 21.4393C30.5376 19.8874 29.7757 18.462 28.6569 17.3431C27.538 16.2243 26.1126 15.4624 24.5607 15.1537C23.0089 14.845 21.4004 15.0035 19.9385 15.609C18.4767 16.2145 17.2273 17.2398 16.3483 18.5554C15.4692 19.871 15 21.4177 15 23C15 24.335 15.325 25.617 15.94 26.766L16.289 27.419L15.634 30.366L18.581 29.711Z" fill="#65686C"/>
<path d="M25.17 31.8899C29.354 31.6129 32.686 28.2329 32.96 23.9899C33.013 23.1599 33.013 22.2999 32.96 21.4699C32.686 17.2279 29.354 13.8499 25.17 13.5709C23.7249 13.4757 22.2751 13.4757 20.83 13.5709C16.646 13.8489 13.314 17.2279 13.04 21.4709C12.987 22.3101 12.987 23.1518 13.04 23.9909C13.14 25.5359 13.823 26.9669 14.628 28.1749C15.095 29.0199 14.787 30.0749 14.3 30.9979C13.95 31.6629 13.774 31.9949 13.915 32.2349C14.055 32.4749 14.37 32.4829 14.999 32.4979C16.244 32.5279 17.083 32.1759 17.749 31.6849C18.126 31.4059 18.315 31.2669 18.445 31.2509C18.575 31.2349 18.832 31.3409 19.344 31.5509C19.804 31.7409 20.339 31.8579 20.829 31.8909C22.254 31.9849 23.743 31.9849 25.171 31.8909" stroke="#65686C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.5 26L20.342 20.474C20.3882 20.3361 20.4766 20.2162 20.5947 20.1313C20.7128 20.0463 20.8545 20.0006 21 20.0006C21.1455 20.0006 21.2872 20.0463 21.4053 20.1313C21.5234 20.2162 21.6118 20.3361 21.658 20.474L23.5 26M26.5 20V26M19.5 24H22.5" stroke="#65686C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</button>
                        <button className={styles['iconBtn'] + (isNewNotification ? ' ' + styles['shake'] : '')} title="Notifications" onClick={handleNotificationClick}><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="45" rx="22.5" fill="#E5E7EB"/>
<path d="M23.0001 13C21.1435 13 19.3631 13.7375 18.0503 15.0503C16.7376 16.363 16.0001 18.1435 16.0001 20V23.528C16.0002 23.6831 15.9642 23.8362 15.8951 23.975L14.1781 27.408C14.0942 27.5757 14.0546 27.7621 14.063 27.9494C14.0714 28.1368 14.1276 28.3188 14.2262 28.4783C14.3248 28.6379 14.4625 28.7695 14.6263 28.8608C14.7901 28.9521 14.9745 29 15.1621 29H30.8381C31.0256 29 31.21 28.9521 31.3738 28.8608C31.5376 28.7695 31.6753 28.6379 31.7739 28.4783C31.8725 28.3188 31.9287 28.1368 31.9371 27.9494C31.9455 27.7621 31.9059 27.5757 31.8221 27.408L30.1061 23.975C30.0365 23.8362 30.0002 23.6832 30.0001 23.528V20C30.0001 18.1435 29.2626 16.363 27.9498 15.0503C26.637 13.7375 24.8566 13 23.0001 13ZM23.0001 32C22.3794 32.0003 21.7739 31.8081 21.2671 31.4499C20.7602 31.0917 20.3769 30.5852 20.1701 30H25.8301C25.6232 30.5852 25.2399 31.0917 24.733 31.4499C24.2262 31.8081 23.6207 32.0003 23.0001 32Z" fill="#65686C"/>
<path d="M23.0001 13C21.1435 13 19.3631 13.7375 18.0503 15.0503C16.7376 16.363 16.0001 18.1435 16.0001 20V23.528C16.0002 23.6831 15.9642 23.8362 15.8951 23.975L14.1781 27.408C14.0942 27.5757 14.0546 27.7621 14.063 27.9494C14.0714 28.1368 14.1276 28.3188 14.2262 28.4783C14.3248 28.6379 14.4625 28.7695 14.6263 28.8608C14.7901 28.9521 14.9745 29 15.1621 29H30.8381C31.0256 29 31.21 28.9521 31.3738 28.8608C31.5376 28.7695 31.6753 28.6379 31.7739 28.4783C31.8725 28.3188 31.9287 28.1368 31.9371 27.9494C31.9455 27.7621 31.9059 27.5757 31.8221 27.408L30.1061 23.975C30.0365 23.8362 30.0002 23.6832 30.0001 23.528V20C30.0001 18.1435 29.2626 16.363 27.9498 15.0503C26.637 13.7375 24.8566 13 23.0001 13ZM23.0001 32C22.3794 32.0003 21.7739 31.8081 21.2671 31.4499C20.7602 31.0917 20.3769 30.5852 20.1701 30H25.8301C25.6232 30.5852 25.2399 31.0917 24.733 31.4499C24.2262 31.8081 23.6207 32.0003 23.0001 32Z" fill="#65686C"/>
</svg>
</button>
                        </div>
                    )}
                    <button className={styles['profileBtn']} title="Profile" onClick={() => navigate('/profile')}>
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.fullName || 'User'} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{user.fullName ? user.fullName.split(' ').map(n => n[0]).join('') : 'U'}</span>
                      )}
                    </button>
                </div>
                {/* FAB chỉ hiển thị trên mobile, nằm trong header */}
                <button className={styles['fab']} onClick={() => setFabOpen((o) => !o)} aria-label="Open actions">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#ffcd29"/><path d="M24 15v18M15 24h18" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
                </button>
            </div>
            {showNotification && (
                <div className={styles['notificationPopup']} onClick={handleNotificationClose}>
                    <div className={styles['notificationContent']}>Notifications go here</div>
                </div>
            )}
            {navOpen && (
                <div className={styles['drawer']}>
                    <button className={styles['closeDrawer']} onClick={handleNavClose} aria-label="Close Menu">×</button>
                    <nav className={styles['drawerNav']} onClick={handleNavClose}>
                        <Link to="/">Home</Link>
                        <Link to="/chat">Chat</Link>
                        <Link to="/transaction-history">Transaction history</Link>
                        <Link to="/about">About</Link>
                    </nav>
                </div>
            )}
            {iconsOpen && (
                <div className={styles['drawerIconsPanel']}>
                    <button className={styles['closeDrawer']} onClick={handleIconsClose} aria-label="Close Actions">×</button>
                    <div className={styles['drawerIcons']}>
                        <button className={styles['iconBtn']} title="Add" onClick={() => navigate('/upload')}><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="45" rx="22.5" fill="#E5E7EB"/>
<circle cx="22.5" cy="22.5" r="10.5" stroke="#65686C" strokeWidth="2"/>
<path d="M22.5 17V28" stroke="#65686C" strokeWidth="2" strokeLinecap="round"/>
<path d="M17 22L28 22" stroke="#65686C" strokeWidth="2" strokeLinecap="round"/>
</svg>
</button>
                        <button className={styles['iconBtn']} title="AI" onClick={() => navigate('/chat-ai')}><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="45" rx="22.5" fill="#E5E7EB"/>
<path d="M18.291 31.824L13 33L14.176 27.709C13.4017 26.2603 12.9977 24.6426 13 23C13 17.477 17.477 13 23 13C28.523 13 33 17.477 33 23C33 28.523 28.523 33 23 33C21.3574 33.0023 19.7397 32.5983 18.291 31.824ZM18.581 29.711L19.234 30.061C20.3926 30.6799 21.6864 31.0025 23 31C24.5823 31 26.129 30.5308 27.4446 29.6518C28.7602 28.7727 29.7855 27.5233 30.391 26.0615C30.9965 24.5997 31.155 22.9911 30.8463 21.4393C30.5376 19.8874 29.7757 18.462 28.6569 17.3431C27.538 16.2243 26.1126 15.4624 24.5607 15.1537C23.0089 14.845 21.4004 15.0035 19.9385 15.609C18.4767 16.2145 17.2273 17.2398 16.3483 18.5554C15.4692 19.871 15 21.4177 15 23C15 24.335 15.325 25.617 15.94 26.766L16.289 27.419L15.634 30.366L18.581 29.711Z" fill="#65686C"/>
<path d="M25.17 31.8899C29.354 31.6129 32.686 28.2329 32.96 23.9899C33.013 23.1599 33.013 22.2999 32.96 21.4699C32.686 17.2279 29.354 13.8499 25.17 13.5709C23.7249 13.4757 22.2751 13.4757 20.83 13.5709C16.646 13.8489 13.314 17.2279 13.04 21.4709C12.987 22.3101 12.987 23.1518 13.04 23.9909C13.14 25.5359 13.823 26.9669 14.628 28.1749C15.095 29.0199 14.787 30.0749 14.3 30.9979C13.95 31.6629 13.774 31.9949 13.915 32.2349C14.055 32.4749 14.37 32.4829 14.999 32.4979C16.244 32.5279 17.083 32.1759 17.749 31.6849C18.126 31.4059 18.315 31.2669 18.445 31.2509C18.575 31.2349 18.832 31.3409 19.344 31.5509C19.804 31.7409 20.339 31.8579 20.829 31.8909C22.254 31.9849 23.743 31.9849 25.171 31.8909" stroke="#65686C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.5 26L20.342 20.474C20.3882 20.3361 20.4766 20.2162 20.5947 20.1313C20.7128 20.0463 20.8545 20.0006 21 20.0006C21.1455 20.0006 21.2872 20.0463 21.4053 20.1313C21.5234 20.2162 21.6118 20.3361 21.658 20.474L23.5 26M26.5 20V26M19.5 24H22.5" stroke="#65686C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</button>
                        <button className={styles['iconBtn']} title="Notifications" onClick={handleNotificationClick}><svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="45" height="45" rx="22.5" fill="#E5E7EB"/>
<path d="M23.0001 13C21.1435 13 19.3631 13.7375 18.0503 15.0503C16.7376 16.363 16.0001 18.1435 16.0001 20V23.528C16.0002 23.6831 15.9642 23.8362 15.8951 23.975L14.1781 27.408C14.0942 27.5757 14.0546 27.7621 14.063 27.9494C14.0714 28.1368 14.1276 28.3188 14.2262 28.4783C14.3248 28.6379 14.4625 28.7695 14.6263 28.8608C14.7901 28.9521 14.9745 29 15.1621 29H30.8381C31.0256 29 31.21 28.9521 31.3738 28.8608C31.5376 28.7695 31.6753 28.6379 31.7739 28.4783C31.8725 28.3188 31.9287 28.1368 31.9371 27.9494C31.9455 27.7621 31.9059 27.5757 31.8221 27.408L30.1061 23.975C30.0365 23.8362 30.0002 23.6832 30.0001 23.528V20C30.0001 18.1435 29.2626 16.363 27.9498 15.0503C26.637 13.7375 24.8566 13 23.0001 13ZM23.0001 32C22.3794 32.0003 21.7739 31.8081 21.2671 31.4499C20.7602 31.0917 20.3769 30.5852 20.1701 30H25.8301C25.6232 30.5852 25.2399 31.0917 24.733 31.4499C24.2262 31.8081 23.6207 32.0003 23.0001 32Z" fill="#65686C"/>
<path d="M23.0001 13C21.1435 13 19.3631 13.7375 18.0503 15.0503C16.7376 16.363 16.0001 18.1435 16.0001 20V23.528C16.0002 23.6831 15.9642 23.8362 15.8951 23.975L14.1781 27.408C14.0942 27.5757 14.0546 27.7621 14.063 27.9494C14.0714 28.1368 14.1276 28.3188 14.2262 28.4783C14.3248 28.6379 14.4625 28.7695 14.6263 28.8608C14.7901 28.9521 14.9745 29 15.1621 29H30.8381C31.0256 29 31.21 28.9521 31.3738 28.8608C31.5376 28.7695 31.6753 28.6379 31.7739 28.4783C31.8725 28.3188 31.9287 28.1368 31.9371 27.9494C31.9455 27.7621 31.9059 27.5757 31.8221 27.408L30.1061 23.975C30.0365 23.8362 30.0002 23.6832 30.0001 23.528V20C30.0001 18.1435 29.2626 16.363 27.9498 15.0503C26.637 13.7375 24.8566 13 23.0001 13ZM23.0001 32C22.3794 32.0003 21.7739 31.8081 21.2671 31.4499C20.7602 31.0917 20.3769 30.5852 20.1701 30H25.8301C25.6232 30.5852 25.2399 31.0917 24.733 31.4499C24.2262 31.8081 23.6207 32.0003 23.0001 32Z" fill="#65686C"/>
</svg>
</button>
                    </div>
        </div>
            )}
            {fabOpen && (
              <div className={styles['fabMenu']} ref={fabMenuRef}>
                <button className={styles['iconBtn']} title="Add" onClick={() => { setFabOpen(false); navigate('/upload'); }}><svg width="28" height="28" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="45" rx="22.5" fill="#E5E7EB"/><circle cx="22.5" cy="22.5" r="10.5" stroke="#65686C" strokeWidth="2"/><path d="M22.5 17V28" stroke="#65686C" strokeWidth="2" strokeLinecap="round"/><path d="M17 22L28 22" stroke="#65686C" strokeWidth="2" strokeLinecap="round"/></svg></button>
                <button className={styles['iconBtn'] + (isAIProcessing ? ' ' + styles['spin'] : '')} title="AI" onClick={() => { setFabOpen(false); navigate('/chat-ai'); }}><svg width="28" height="28" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="45" rx="22.5" fill="#E5E7EB"/><path d="M18.291 31.824L13 33L14.176 27.709C13.4017 26.2603 12.9977 24.6426 13 23C13 17.477 17.477 13 23 13C28.523 13 33 17.477 33 23C33 28.523 28.523 33 23 33C21.3574 33.0023 19.7397 32.5983 18.291 31.824ZM18.581 29.711L19.234 30.061C20.3926 30.6799 21.6864 31.0025 23 31C24.5823 31 26.129 30.5308 27.4446 29.6518C28.7602 28.7727 29.7855 27.5233 30.391 26.0615C30.9965 24.5997 31.155 22.9911 30.8463 21.4393C30.5376 19.8874 29.7757 18.462 28.6569 17.3431C27.538 16.2243 26.1126 15.4624 24.5607 15.1537C23.0089 14.845 21.4004 15.0035 19.9385 15.609C18.4767 16.2145 17.2273 17.2398 16.3483 18.5554C15.4692 19.871 15 21.4177 15 23C15 24.335 15.325 25.617 15.94 26.766L16.289 27.419L15.634 30.366L18.581 29.711Z" fill="#65686C"/><path d="M25.17 31.8899C29.354 31.6129 32.686 28.2329 32.96 23.9899C33.013 23.1599 33.013 22.2999 32.96 21.4699C32.686 17.2279 29.354 13.8499 25.17 13.5709C23.7249 13.4757 22.2751 13.4757 20.83 13.5709C16.646 13.8489 13.314 17.2279 13.04 21.4709C12.987 22.3101 12.987 23.1518 13.04 23.9909C13.14 25.5359 13.823 26.9669 14.628 28.1749C15.095 29.0199 14.787 30.0749 14.3 30.9979C13.95 31.6629 13.774 31.9949 13.915 32.2349C14.055 32.4749 14.37 32.4829 14.999 32.4979C16.244 32.5279 17.083 32.1759 17.749 31.6849C18.126 31.4059 18.315 31.2669 18.445 31.2509C18.575 31.2349 18.832 31.3409 19.344 31.5509C19.804 31.7409 20.339 31.8579 20.829 31.8909C22.254 31.9849 23.743 31.9849 25.171 31.8909" stroke="#65686C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 26L20.342 20.474C20.3882 20.3361 20.4766 20.2162 20.5947 20.1313C20.7128 20.0463 20.8545 20.0006 21 20.0006C21.1455 20.0006 21.2872 20.0463 21.4053 20.1313C21.5234 20.2162 21.6118 20.3361 21.658 20.474L23.5 26M26.5 20V26M19.5 24H22.5" stroke="#65686C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                <button className={styles['iconBtn']} title="Notifications" onClick={() => { setFabOpen(false); handleNotificationClick(); }}><svg width="28" height="28" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="45" rx="22.5" fill="#E5E7EB"/><path d="M23.0001 13C21.1435 13 19.3631 13.7375 18.0503 15.0503C16.7376 16.363 16.0001 18.1435 16.0001 20V23.528C16.0002 23.6831 15.9642 23.8362 15.8951 23.975L14.1781 27.408C14.0942 27.5757 14.0546 27.7621 14.063 27.9494C14.0714 28.1368 14.1276 28.3188 14.2262 28.4783C14.3248 28.6379 14.4625 28.7695 14.6263 28.8608C14.7901 28.9521 14.9745 29 15.1621 29H30.8381C31.0256 29 31.21 28.9521 31.3738 28.8608C31.5376 28.7695 31.6753 28.6379 31.7739 28.4783C31.8725 28.3188 31.9287 28.1368 31.9371 27.9494C31.9455 27.7621 31.9059 27.5757 31.8221 27.408L30.1061 23.975C30.0365 23.8362 30.0002 23.6832 30.0001 23.528V20C30.0001 18.1435 29.2626 16.363 27.9498 15.0503C26.637 13.7375 24.8566 13 23.0001 13ZM23.0001 32C22.3794 32.0003 21.7739 31.8081 21.2671 31.4499C20.7602 31.0917 20.3769 30.5852 20.1701 30H25.8301C25.6232 30.5852 25.2399 31.0917 24.733 31.4499C24.2262 31.8081 23.6207 32.0003 23.0001 32Z" fill="#65686C"/><path d="M23.0001 13C21.1435 13 19.3631 13.7375 18.0503 15.0503C16.7376 16.363 16.0001 18.1435 16.0001 20V23.528C16.0002 23.6831 15.9642 23.8362 15.8951 23.975L14.1781 27.408C14.0942 27.5757 14.0546 27.7621 14.063 27.9494C14.0714 28.1368 14.1276 28.3188 14.2262 28.4783C14.3248 28.6379 14.4625 28.7695 14.6263 28.8608C14.7901 28.9521 14.9745 29 15.1621 29H30.8381C31.0256 29 31.21 28.9521 31.3738 28.8608C31.5376 28.7695 31.6753 28.6379 31.7739 28.4783C31.8725 28.3188 31.9287 28.1368 31.9371 27.9494C31.9455 27.7621 31.9059 27.5757 31.8221 27.408L30.1061 23.975C30.0365 23.8362 30.0002 23.6832 30.0001 23.528V20C30.0001 18.1435 29.2626 16.363 27.9498 15.0503C26.637 13.7375 24.8566 13 23.0001 13ZM23.0001 32C22.3794 32.0003 21.7739 31.8081 21.2671 31.4499C20.7602 31.0917 20.3769 30.5852 20.1701 30H25.8301C25.6232 30.5852 25.2399 31.0917 24.733 31.4499C24.2262 31.8081 23.6207 32.0003 23.0001 32Z" fill="#65686C"/></svg></button>
              </div>
            )}
        </header>
    )
}

export default Header
