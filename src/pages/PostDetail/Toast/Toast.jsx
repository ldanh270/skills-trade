import React, { useEffect } from 'react'

import styles from './Toast.module.scss'

const Toast = ({ message, type, onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)
        return () => clearTimeout(timer)
    }, [duration, onClose])

    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.content}>
                {type === 'success' && <span className={styles.icon}>✓</span>}
                {type === 'error' && <span className={styles.icon}>✕</span>}
                {type === 'loading' && <span className={styles.spinner}></span>}
                <span className={styles.message}>{message}</span>
            </div>
        </div>
    )
}

export default Toast
