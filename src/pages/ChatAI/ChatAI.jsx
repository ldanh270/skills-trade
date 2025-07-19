import { Send } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import botAvatar from '/logo-skills-trade.svg'
import { AI_URL } from '~/api/api-constants'

import styles from './ChatAI.module.scss'

const initialMessages = []

export default function ChatAI() {
    const [input, setInput] = useState('')
    const chatEndRef = useRef(null)
    const [messages, setMessages] = useState(initialMessages)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = input.trim()
        setMessages((msgs) => [...msgs, { from: 'user', text: userMessage }])
        setInput('')

        try {
            const response = await fetch(`${AI_URL}ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: userMessage,
                }),
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const res = await response.json()

            // Console log toàn bộ response để debug
            console.log('Full API response:', res)
            console.log('Answer:', res.answer)
            console.log('Posts:', res.posts)

            // Lưu posts vào state
            if (res.posts && Array.isArray(res.posts)) {
                setPosts(res.posts)
            }

            // Thêm câu trả lời từ API
            if (res.answer) {
                setMessages((msgs) => [...msgs, { from: 'bot', text: res.answer }])
            } else {
                setMessages((msgs) => [
                    ...msgs,
                    { from: 'bot', text: 'Xin lỗi, tôi không nhận được câu trả lời hợp lệ.' },
                ])
            }
        } catch (error) {
            console.error('Error fetching answer:', error)
            setMessages((msgs) => [
                ...msgs,
                {
                    from: 'bot',
                    text: 'Xin lỗi, tôi không thể trả lời câu hỏi này ngay bây giờ. Vui lòng thử lại sau.',
                },
            ])
        }
    }

    // TODO: Implement sidebar actions when needed
    // const handleSidebarAction = (action) => {
    //     if (selectedIdx === null) return
    //     if (action === 'delete') {
    //         setMessages((msgs) => msgs.filter((_, idx) => idx !== selectedIdx))
    //         setSelectedIdx(null)
    //     }
    //     if (action === 'copy') {
    //         navigator.clipboard.writeText(messages[selectedIdx].text)
    //     }
    //     if (action === 'edit') {
    //         const newText = prompt('Edit message:', messages[selectedIdx].text)
    //         if (newText !== null) {
    //             setMessages((msgs) =>
    //                 msgs.map((msg, idx) => (idx === selectedIdx ? { ...msg, text: newText } : msg)),
    //             )
    //         }
    //     }
    // }

    const handleRefresh = () => setMessages(initialMessages)

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
                                let userQuestion = ''
                                for (let i = idx - 1; i >= 0; i--) {
                                    if (messages[i].from === 'user') {
                                        userQuestion = messages[i].text
                                        break
                                    }
                                }
                                return (
                                    <div key={idx} className={styles.botMsg}>
                                        <div className={styles.botMsgHeader}>
                                            <img
                                                src={botAvatar}
                                                className={styles.botAvatar}
                                                alt="Bot"
                                            />
                                            <span className={styles.botMsgName}>
                                                {userQuestion}
                                            </span>
                                        </div>
                                        <div className={styles.botMsgContent}>
                                            <span>{msg.text}</span>
                                        </div>
                                    </div>
                                )
                            }
                            // Bubble user như cũ
                            return (
                                <div key={idx} className={styles.userMsg}>
                                    <span>{msg.text}</span>
                                </div>
                            )
                        })}

                        {/* Hiển thị posts nếu có */}
                        {posts.length > 0 && (
                            <div className={styles.postsSection}>
                                <h3>Bài viết liên quan:</h3>
                                {posts.map((post, idx) => (
                                    <div key={post.id || idx} className={styles.postCard}>
                                        <h4>{post.title}</h4>
                                        <p>{post.description}</p>
                                        <div className={styles.postMeta}>
                                            <span>Type: {post.type}</span>
                                            <span>Skills: {post.skills?.join(', ')}</span>
                                            <span>
                                                Price: ${post.price?.min} - ${post.price?.max}
                                            </span>
                                            <span>Author: {post.author?.username}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>
                    <form className={styles.chatInputBar} onSubmit={handleSend}>
                        <input
                            className={styles.chatInput}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything from here"
                        />
                        <button type="submit" className={styles.sendBtn}>
                            <Send />
                        </button>
                    </form>
                </div>
            </div>

            {/* Sidebar - nằm ngoài chatCard */}
            <div className={styles.chatSidebar}>
                <button className={styles.iconBtn} onClick={handleRefresh}>
                    <span role="img" aria-label="refresh">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-refresh-ccw-icon lucide-refresh-ccw"
                        >
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                            <path d="M16 16h5v5" />
                        </svg>
                    </span>
                </button>
                <button className={styles.iconBtn}>
                    <span role="img" aria-label="like">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-thumbs-up-icon lucide-thumbs-up"
                        >
                            <path d="M7 10v12" />
                            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                    </span>
                </button>
                <button className={styles.iconBtn}>
                    <span role="img" aria-label="dislike">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-thumbs-up-icon lucide-thumbs-up"
                        >
                            <path d="M7 10v12" />
                            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                    </span>
                </button>
                <button className={styles.iconBtn}>
                    <span role="img" aria-label="copy">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-clipboard-icon lucide-clipboard"
                        >
                            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        </svg>
                    </span>
                </button>
                <button className={styles.iconBtn}>
                    <span role="img" aria-label="voice">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-volume2-icon lucide-volume-2"
                        >
                            <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                            <path d="M16 9a5 5 0 0 1 0 6" />
                            <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    )
}
