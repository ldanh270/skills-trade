import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Landing.module.scss'

const Landing = () => {
    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <span>SkillsTrade</span>
                </div>
                <div className={styles.menu}>
                    <Link to="/login">Home</Link>
                    <Link to="/login">Chat</Link>
                    <Link to="/login">Transaction history</Link>
                    <Link to="/login">About</Link>
                </div>
                <div className={styles.actions}>
                    <Link to="/login" className={styles['login']}>
                        Login
                    </Link>
                </div>
            </nav>
            <div className={styles.hero}>
                <div className={styles.text}>
                    <h1>ABOUT US</h1>
                    <p>
                        Skills Trade is a global skill-exchange platform for students. No money
                        needed just points. Post the skills you offer, get matched with skills you
                        need. Build your credibility through reviews, tests, and real
                        collaborations. Chat, connect, and grow together.
                    </p>
                    <Link to="/login" className={styles['get-started']}>
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing
