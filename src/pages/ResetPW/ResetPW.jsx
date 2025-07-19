import React, { useState } from 'react';
import styles from './ResetPW.module.scss';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResetPW = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setIsSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles['logo-text']}>SkillsTrade</span>
        </div>
      </nav>

      <div className={styles['reset-container']}>
        <div className={styles['reset-box']}>
          {!isSubmitted ? (
            <>
              <div className={styles['back-link']}>
                <Link to="/reset" className={styles['forgot-password']}>
                  <FaArrowLeft /> Back to reset
                </Link>
              </div>
              
              <h1 className={styles['reset-title']}>Reset Password</h1>
              <p className={styles['reset-subtitle']}>
                Enter your email to receive a reset link
              </p>

              <form onSubmit={handleSubmit}>
                <div className={styles['input-group']}>
                  <FaEnvelope className={styles['input-icon']} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button type="submit" className={styles['reset-button']}>
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className={styles['reset-title']}>Check Your Email</h1>
              <div className={styles['success-message']}>
                <p>We've sent instructions to <strong>{email}</strong></p>
                <p>Please check your inbox and spam folder</p>
              </div>
              <div className={styles['register-link']}>
                <span>Remember your password?</span>
                <Link to="/reset" className={styles['register-link']}>Sign In</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPW;