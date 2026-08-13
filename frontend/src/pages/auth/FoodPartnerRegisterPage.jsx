import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerRegister = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const contactName = e.target.contactName.value
    const phone = e.target.phone.value
    const email = e.target.email.value
    const password = e.target.password.value
    const address = e.target.address.value

    const response = await axios.post(
      'http://localhost:3000/api/auth/food-partner/register',
      {
        name,
        email,
        password,
        phone,
        address,
        contactName,
      },
      {
        withCredentials: true,
      },
    )

    console.log(response.data)
    navigate('/create-food')
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__intro">
          <span className="auth-chip">Food partner access</span>
          <h2>Join as a food partner</h2>
          <p>Grow your reach with a simple, polished presence for your kitchen.</p>
        </div>

        <div className="auth-card__form">
          <div className="auth-card__header">
            <div>
              <h1>Food partner signup</h1>
              <p>Create your access and start using the platform.</p>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field" style={{ gridColumn: '1 / -1' }}>
              <span>Business Name</span>
              <input name="name" type="text" placeholder="Sunny Bites" />
            </label>

            <div className="auth-row">
              <label className="auth-field">
                <span>Contact Name</span>
                <input name="contactName" type="text" placeholder="Jordan Carter" />
              </label>
              <label className="auth-field">
                <span>Contact Number</span>
                <input name="phone" type="tel" placeholder="+91 98765 43210" />
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

            <label className="auth-field">
              <span>Address</span>
              <input name="address" type="text" placeholder="123, Main Street, City" />
            </label>

            <button type="submit" className="auth-submit">Create account</button>
          </form>

          <div className="auth-card__nav">
            <span>Already partnered?</span>
            <Link to="/food-partner/login">Sign in</Link>
          </div>

          <div className="auth-quick-links">
            <span>Sign up as</span>
            <Link to="/user/register">User</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
