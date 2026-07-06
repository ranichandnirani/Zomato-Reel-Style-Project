import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'

const FoodPartnerRegisterPage = () => {
  return (
    <AuthCard
      title="Join as a food partner"
      subtitle="Grow your reach with a simple, polished presence for your kitchen."
      roleLabel="Food Partner"
      accentLabel="Food partner access"
      isRegister
      footerText="Already partnered with us?"
      footerLinkLabel="Sign in"
      footerLinkHref="/food-partner/login"
    />
  )
}

export default FoodPartnerRegisterPage
