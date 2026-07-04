import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'

const FoodPartnerLoginPage = () => {
  return (
    <AuthCard
      title="Partner dashboard"
      subtitle="Welcome back. Manage your menu, orders, and reach in one place."
      roleLabel="Food Partner"
      accentLabel="Food-Partner access"
      footerText="New partner?"
      footerLinkLabel="Create account"
    />
  )
}

export default FoodPartnerLoginPage
