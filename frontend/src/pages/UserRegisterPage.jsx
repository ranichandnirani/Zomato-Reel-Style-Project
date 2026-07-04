import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'

const UserRegisterPage = () => {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up to discover meals, save favorites, and order with ease."
      roleLabel="User"
      accentLabel="User access"
      isRegister
      footerText="Already have an account?"
      footerLinkLabel="Log in"
    />
  )
}

export default UserRegisterPage
