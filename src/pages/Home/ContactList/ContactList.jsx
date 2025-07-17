import { memo } from 'react'

import styles from './ContactList.module.scss'

// Display mutual contacts (users who are both following and followers)
const ContactList = ({ user, onSelect }) => {
    if (!user) return null

    const following = user.following
    const followers = user.follower

    // Only show mutual contacts (both followed & following)
    const contacts = followers.filter((follower) => following.some((f) => f.id === follower.id))

    return (
        <div className={styles['wrapper']}>
            {/* Header */}
            <div className={styles['header']}>
                <span className={styles['title']}>Contacts</span>
            </div>

            {/* Contact List */}
            <div className={styles['list']}>
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        onClick={() => onSelect(contact)}
                        className={styles['item']}
                    >
                        {/* Avatar + Online/Offline Status */}
                        <div className={styles['avatar-wrapper']}>
                            <img src={contact.avatar} alt="avatar" />
                            <span className={`${styles['status']} ${styles[contact.status]}`} />
                        </div>

                        {/* Contact Name */}
                        <span className={styles['name']}>
                            {contact.fullName || `${contact.status} contact`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(ContactList)
