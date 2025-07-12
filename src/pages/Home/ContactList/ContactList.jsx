import { MoreHorizontal, Plus, Search } from 'lucide-react'
import { memo } from 'react'

import styles from './ContactList.module.scss'

const ContactList = ({ user, onSelect }) => {
    if (!user) return null
    const contacts = [...user.follower, ...user.following]

    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <span className={styles['title']}>Contacts</span>
            </div>

            <div className={styles['list']}>
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        onClick={() => onSelect(contact)}
                        className={styles['item']}
                    >
                        <div className={styles['avatar-wrapper']}>
                            <img src={contact.avatar} alt="avatar" />
                            <span className={`${styles['status']} ${styles[contact.status]}`} />
                        </div>
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
