import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'

import styles from './Login.module.scss'

const Login = () => {
    const [password, setPassword] = useState('')

    const handleLinkClick = (e) => {
        e.preventDefault()
    }

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <span className={styles['logo-text']}>SkillsTrade</span>
                </div>
            </nav>

            <div className={styles['login-container']}>
                <div className={styles['login-box']}>
                    <h1 className={styles['login-title']}>Login</h1>

                    <div className={styles['input-group']}>
                        <FaEnvelope className={styles['input-icon']} />
                        <input type="text" placeholder="Enter your username" />
                    </div>

                    <div className={styles['input-group']}>
                        <FaLock className={styles['input-icon']} />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles['options-row']}>
                        <div className={styles['checkbox-group']}>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className={styles['forgot-password']} onClick={handleLinkClick}>
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        className={styles['login-button']}
                        onClick={async (e) => {
                            e.preventDefault()
                            // Lấy username và password từ input
                            const username = document.querySelector('input[type="text"]')?.value
                            const pwd = password
                            if (!username || !pwd) {
                                alert('Please enter both username and password.')
                                return
                            }
                            // Gọi API để lấy danh sách user
                            try {
                                const res = await fetch('http://localhost:3001/users')
                                const users = await res.json()
                                const foundUser = users.find(
                                    (u) => u.username === username && u.password === pwd,
                                )
                                if (foundUser) {
                                    // Dispatch lên redux
                                    // Giả sử bạn đã setup redux và có action setUser
                                    // import { useDispatch } from 'react-redux'
                                    // import { setUser } from 'path/to/userSlice'
                                    // const dispatch = useDispatch()
                                    // dispatch(setUser(foundUser))
                                    window.localStorage.setItem('user', JSON.stringify(foundUser))
                                    window.location.href = '/'
                                } else {
                                    alert('Invalid username or password.')
                                }
                            } catch {
                                alert('Login failed. Please try again later.')
                            }
                        }}
                    >
                        Login
                    </button>

                    <div className={styles['register-link']}>
                        <span>Don't have an account?</span>
                        <a href="#" onClick={handleLinkClick}>
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
