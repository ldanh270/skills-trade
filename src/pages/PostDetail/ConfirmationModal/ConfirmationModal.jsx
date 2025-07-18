import React from 'react'

import styles from './ConfirmationModal.module.scss'

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonClass = 'primary',
    cancelButtonClass = 'secondary',
}) => {
    if (!isOpen) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <div className={styles.overlay} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className={styles.content}>
                    <p className={styles.message}>{message}</p>
                </div>
                <div className={styles.actions}>
                    <button
                        className={`${styles.button} ${styles[cancelButtonClass]}`}
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button
                        className={`${styles.button} ${styles[confirmButtonClass]}`}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
