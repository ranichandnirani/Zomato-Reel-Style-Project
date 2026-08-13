import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const response = await axios.post('http://localhost:3000/api/auth/user/login', {
      email,
      password
    }, {
      withCredentials: true,
    })

    console.log(response.data)
    navigate('/')
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__intro">
          <span className="auth-chip">User access</span>
          <h2>Welcome back</h2>
          <p>Sign in to continue exploring your next favorite meal.</p>
        </div>

        <div className="auth-card__form">
          <div className="auth-card__header">
            <div>
              <h1>User sign in</h1>
              <p>Use your account credentials to continue.</p>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Email</span>
              <input name="email" type="email" placeholder="name@example.com" />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input name="password" type="password" placeholder="Enter password" />
            </label>

            <button type="submit" className="auth-submit">Sign in</button>
          </form>

          <div className="auth-card__nav">
            <span>New here?</span>
            <Link to="/user/register">Create account</Link>
          </div>

          <div className="auth-quick-links">
            <span>Sign in as</span>
            <Link to="/food-partner/login">Food partner</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
