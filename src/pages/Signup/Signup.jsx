import React, { useState } from 'react';
import styles from './Signup.module.scss';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', formData);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles['logo-text']}>SkillsTrade</span>
        </div>
      </nav>

      <div className={styles['signup-container']}>
        <div className={styles['signup-box']}>
          <h1 className={styles['signup-title']}>Sign Up</h1>

          <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <div className={styles['input-group']}>
              <FaUser className={styles['input-icon']} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>

            <div className={styles['input-group']}>
              <FaEnvelope className={styles['input-icon']} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className={styles['input-group']}>
              <FaLock className={styles['input-icon']} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              {formData.password && (
                <span
                  className={styles['toggle-password']}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>

            <div className={styles['terms-group']}>
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms">
                I agree to the <a href="/terms" className={styles['terms-link']}>Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className={styles['signup-button']}>
              Sign Up
            </button>
          </form>

          <div className={styles['login-link']}>
            <span>Already have an account?</span>
            <a href="/login" className={styles['login-link-text']}>Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;