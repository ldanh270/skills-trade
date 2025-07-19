import React, { useState } from 'react'

import styles from './StepTitle.module.scss'

export default function StepTitle({ formData, setFormData, next, prev }) {
    const [title, setTitle] = useState(formData.title || '')

    return (
        <div className={styles['step-title']}>
            <div className={styles['content']}>
                <h1 className={styles['title']}>Title of Post</h1>
                <p className={styles['description']}>
                    Write a clear and concise title that describes what you're offering or looking
                    for. Good titles help the right people find your post.
                </p>
                <input
                    type="text"
                    value={title}
                    placeholder="Enter your post title..."
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={styles['actions']}>
                <hr className={styles['separator']} />

                <div className={styles['buttons']}>
                    <button className={styles['back']} onClick={prev}>
                        Back
                    </button>
                    <button
                        className={`
                            ${styles['next']}
                            ${title.trim() ? styles['active'] : styles['disabled']}`}
                        onClick={() => {
                            if (title.trim()) {
                                setFormData({ ...formData, title })
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
