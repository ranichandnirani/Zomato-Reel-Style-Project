import React from 'react'
import '../styles/auth.css'

const AuthCard = ({
  title,
  subtitle,
  roleLabel,
  accentLabel,
  isRegister = false,
  footerText,
  footerLinkLabel,
}) => {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__intro">
          <span className="auth-chip">{accentLabel}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="auth-card__form">
          <form className="auth-form">
            {isRegister && (
              <div className="auth-row">
                {roleLabel === 'Food Partner' ? (
                  <label className="auth-field" style={{ gridColumn: '1 / -1' }}>
                    <span>Business Name</span>
                    <input type="text" placeholder="Sunny Bites" />
                  </label>
                ) : (
                  <>
                    <label className="auth-field auth-field--half">
                      <span>First Name</span>
                      <input type="text" placeholder="Alex" />
                    </label>

                    <label className="auth-field auth-field--half">
                      <span>Last Name</span>
                      <input type="text" placeholder="Carter" />
                    </label>
                  </>
                )}
              </div>
            )}

            {isRegister && (
              <div className="auth-row">
                <label className="auth-field auth-field--half">
                  <span>Contact Name</span>
                  <input type="text" placeholder="Jordan Carter" />
                </label>

                <label className="auth-field auth-field--half">
                  <span>Contact Number</span>
                  <input type="tel" placeholder="+91 98765 43210" />
                </label>
              </div>
            )}

            <label className="auth-field">
              <span>Email</span>
              <input type="email" placeholder="name@example.com" />
            </label>

            {isRegister && (
              <label className="auth-field">
                <span>Password</span>
                <input type="password" placeholder="Enter password" />
              </label>
            )}

            {!isRegister && (
              <label className="auth-field">
                <span>Password</span>
                <input type="password" placeholder="Enter password" />
              </label>
            )}

            {isRegister && (
              <label className="auth-field">
                <span>Address</span>
                <input type="text" placeholder="123, Main Street, City" />
              </label>
            )}

            <button type="button" className="auth-submit">
              {isRegister ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <div className="auth-footer">
            <p>{footerText}</p>
            <a href="#">{footerLinkLabel}</a>
          </div>

          <div className="auth-role-links">
            <span>Sign up as</span>
            <a href="/user/register">User</a>
            <span>or</span>
            <a href="/food-partner/register">Food-partner</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthCard
