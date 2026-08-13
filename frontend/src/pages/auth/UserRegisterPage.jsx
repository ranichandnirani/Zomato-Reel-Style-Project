import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const firstName = e.target.firstName.value
    const lastName = e.target.lastName.value
    const email = e.target.email.value
    const password = e.target.password.value

    const response = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullName: firstName + ' ' + lastName,
      email,
      password
    }, {
      withCredentials: true
    })

    console.log(response.data)
    navigate('/')
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__intro">
          <span className="auth-chip">User access</span>
          <h2>Create your account</h2>
          <p>Sign up to discover meals, save favorites, and order with ease.</p>
        </div>

        <div className="auth-card__form">
          <div className="auth-card__header">
            <div>
              <h1>User signup</h1>
              <p>Create your access and start using the platform.</p>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-row">
              <label className="auth-field">
                <span>First name</span>
                <input name="firstName" type="text" placeholder="Alex" />
              </label>
              <label className="auth-field">
                <span>Last name</span>
                <input name="lastName" type="text" placeholder="Carter" />
              </label>
            </div>

            <label className="auth-field">
              <span>Email</span>
              <input name="email" type="email" placeholder="name@example.com" />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input name="password" type="password" placeholder="Enter password" />
            </label>

            <button type="submit" className="auth-submit">Create account</button>
          </form>

          <div className="auth-card__nav">
            <span>Already have an account?</span>
            <Link to="/user/login">Log in</Link>
          </div>

          <div className="auth-quick-links">
            <span>Sign up as</span>
            <Link to="/food-partner/register">Food partner</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegister
