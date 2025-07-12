import { SendHorizonal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { createChat, fetchChats, updateChatMessages } from '~/api/api-chat'

import styles from './ChatBox.module.scss'

const currentUserId = '1a2b3c4d-5e6f-7a8b-9c0d-111213141516'

const ChatBox = ({ contact, onClose }) => {
    const [messages, setMessages] = useState([])
    const [chatId, setChatId] = useState(null)
    const [input, setInput] = useState('')

    const bottomRef = useRef()

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    useEffect(() => {
        const loadChat = async () => {
            if (!contact) return
            const chats = await fetchChats()
            const chat = chats.find(
                (c) =>
                    c.participants.includes(currentUserId) && c.participants.includes(contact.id),
            )

            if (chat) {
                setChatId(chat.id)
                setMessages(chat.messages)
            } else {
                setChatId(null)
                setMessages([])
            }
        }

        loadChat()
    }, [contact])

    const handleSend = async () => {
        if (!input.trim()) return

        const newMessage = {
            senderId: currentUserId,
            content: input,
            timestamp: new Date().toISOString(),
        }

        const updated = [...messages, newMessage]
        setMessages(updated)
        setInput('')

        if (chatId) {
            await updateChatMessages(chatId, updated)
        } else {
            const newChat = await createChat([currentUserId, contact.id], newMessage)
            setChatId(newChat.id)
        }
    }

    // Press 'Enter' to add task
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend()
        }
    }

    return (
        <div className={styles['chat-container']}>
            <div className={styles['chat-header']}>
                <div className={styles['contact-info']}>
                    <div className={styles['avatar-wrapper']}>
                        <img src={contact.avatar} alt="avatar" />
                        <span className={`${styles['status']} ${styles[contact.status]}`} />
                    </div>
                    <span>{contact.fullName}</span>
                </div>
                <button className={styles['close-button']} onClick={onClose}>
                    ×
                </button>
            </div>

            <div className={styles['chat-body']}>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`${styles['message']} ${
                            msg.senderId === currentUserId ? styles['sent'] : styles['received']
                        }`}
                    >
                        <span>{msg.content}</span>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className={styles['chat-input']}>
                <input
                    type="text"
                    placeholder="Aa"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <SendHorizonal
                    className={styles['send-button']}
                    onClick={handleSend}
                    size={20}
                    color="#fff"
                />
            </div>
        </div>
    )
}

export default ChatBox
