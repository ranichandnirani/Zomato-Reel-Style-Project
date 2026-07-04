import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'

const UserLoginPage = () => {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue exploring your next favorite meal."
      roleLabel="User"
      accentLabel="User access"
      footerText="New here?"
      footerLinkLabel="Create account"
    />
  )
}

export default UserLoginPage
