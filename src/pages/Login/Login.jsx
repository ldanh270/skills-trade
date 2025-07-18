import React, { useState } from 'react';
import styles from './Login.module.scss';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
  };

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
            <input 
              type="email" 
              placeholder="Enter your email"
            />
          </div>

          <div className={styles['input-group']}>
            <FaLock className={styles['input-icon']} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {password && (
              <span className={styles['toggle-password']} onClick={handleTogglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
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

          <button className={styles['login-button']}>Login</button>

          <div className={styles['register-link']}>
            <span>Don't have an account?</span>
            <a href="#" onClick={handleLinkClick}>Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;