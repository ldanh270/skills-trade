import { MessageSquare } from 'lucide-react'
import React, { useState } from 'react'

import styles from './StepDescription.module.scss'

export default function StepDescription({ formData, setFormData, next, prev }) {
    const [desc, setDesc] = useState(formData.description || '')
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={styles['step-description']}>
            <div className={styles['content']}>
                <h1 className={styles['title']}>Description</h1>
                <p className={styles['description']}>
                    Provide a <strong>clear and detailed</strong> explanation about your offer or
                    request.
                </p>

                <div
                    className={`${styles['textarea-wrapper']} ${isFocused || desc ? styles['focused'] : ''}`}
                >
                    <MessageSquare size={20} className={styles['icon']} />
                    {!isFocused && !desc && (
                        <span className={styles['placeholder']}>
                            Write a clear and detailed description...
                        </span>
                    )}
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
            </div>

            <div className={styles['actions']}>
                <hr className={styles['separator']} />
                <div className={styles['buttons']}>
                    <button className={styles['back']} onClick={prev}>
                        Back
                    </button>
                    <button
                        className={`${styles['next']} ${desc.trim() ? styles['active'] : styles['disabled']}`}
                        onClick={() => {
                            if (desc.trim()) {
                                setFormData({ ...formData, description: desc.trim() })
                                next()
                            }
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
