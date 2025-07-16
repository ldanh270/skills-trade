import React from 'react'

import styles from './Sidebar.module.scss'

// ----- SIDEBAR COMPONENT -----
const Sidebar = ({ steps, current, status }) => {
    // ----- RENDER SIDEBAR STEPS -----
    return (
        <div className={styles['Sidebar']}>
            {steps.map((step, idx) => (
                <div key={step.key} className={styles['step-item']}>
                    <div
                        className={`${styles['step-circle']} ${
                            current >= idx ? styles['active'] : ''
                        }`}
                    >
                        {status === 'success' && idx === steps.length - 1
                            ? '✔'
                            : current > idx
                              ? '✓'
                              : idx + 1}
                    </div>
                    <span className={styles['step-label']}>{step.label}</span>
                </div>
            ))}
        </div>
    )
}

// ----- EXPORT COMPONENT -----
export default Sidebar
