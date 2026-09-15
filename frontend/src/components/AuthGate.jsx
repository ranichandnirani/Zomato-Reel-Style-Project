import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/auth-gate.css'

const authPaths = [
  '/user/register',
  '/user/login',
  '/food-partner/register',
  '/food-partner/login',
]

const AuthGate = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let isMounted = true

    axios.get('http://localhost:3000/api/auth/session', { withCredentials: true })
      .then((response) => {
        if (isMounted) setIsAuthenticated(response.data.authenticated === true)
      })
      .catch(() => {
        if (isMounted) setIsAuthenticated(false)
      })
      .finally(() => {
        if (isMounted) setIsChecking(false)
      })

    return () => {
      isMounted = false
    }
  }, [location.pathname])

  const isAuthPage = authPaths.includes(location.pathname)

  return (
    <>
      {children}
      {!isChecking && !isAuthenticated && !isAuthPage && (
        <div className="auth-gate" role="dialog" aria-modal="true" aria-labelledby="auth-gate-title">
          <div className="auth-gate__backdrop" />
          <section className="auth-gate__card">
            <span className="auth-chip">Welcome to Zomato Reels</span>
            <h1 id="auth-gate-title">Your next favorite meal is waiting.</h1>
            <p>Sign in or create a free account to explore food reels, save favorites, and connect with local kitchens.</p>
            <div className="auth-gate__actions">
              <button type="button" className="auth-submit" onClick={() => navigate('/user/login')}>
                Sign in
              </button>
              <button type="button" className="auth-gate__secondary" onClick={() => navigate('/user/register')}>
                Create an account
              </button>
            </div>
            <div className="auth-gate__partner">
              <span>Are you a food partner?</span>
              <button type="button" onClick={() => navigate('/food-partner/login')}>Partner sign in</button>
              <span>or</span>
              <button type="button" onClick={() => navigate('/food-partner/register')}>Join us</button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default AuthGate