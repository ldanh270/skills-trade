import React, { useState } from 'react'

import styles from './StepType.module.scss'

export default function StepType({ formData, setFormData, next }) {
    const [selected, setSelected] = useState(formData.type || '')

    const handleSelect = (type) => {
        setSelected(type === formData.type ? '' : type)
        setFormData({ ...formData, type: type === formData.type ? '' : type })
    }

    return (
        <div className={styles['step-type']}>
            <div className={styles['content']}>
                <h1 className={styles['title']}>Type of Post</h1>
                <span className={styles['description']}>
                    Select the type of post you want to create. Are you offering a service or hiring
                    someone?
                </span>
                <ul className={styles['type-list']}>
                    <li>
                        <strong>Offer</strong> – You're offering your skills, services, or help to
                        others. For example, “I can mentor you in Java” or “Available for web design
                        projects.”
                    </li>
                    <li>
                        <strong>Hire</strong> – You're looking to hire someone with a specific
                        skill. For example, “Looking for a Python tutor” or “Need a logo designed.”
                    </li>
                </ul>

                <div className={styles['buttons']}>
                    {['Offer', 'Hire'].map((item) => (
                        <button
                            key={item}
                            onClick={() => handleSelect(item)}
                            className={
                                formData.type === item
                                    ? `${styles['active']} ${styles[item]}`
                                    : styles[item]
                            }
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles['actions']}>
                <hr className={styles['separator']} />

                <div className={styles['buttons']}>
                    <button
                        disabled={!selected}
                        onClick={next}
                        className={!selected ? styles['disabled'] : ''}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
