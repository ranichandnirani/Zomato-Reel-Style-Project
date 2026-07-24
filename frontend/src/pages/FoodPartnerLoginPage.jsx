import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerLoginPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const response = await axios.post(
      'http://localhost:3000/api/auth/food-partner/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    )

    console.log(response.data)
    navigate('/')
  }

  return (
    <AuthCard
      title="Partner dashboard"
      subtitle="Welcome back. Manage your menu, orders, and reach in one place."
      roleLabel="Food Partner"
      accentLabel="Food partner access"
      onSubmit={handleSubmit}
      footerText="New partner?"
      footerLinkLabel="Create account"
      footerLinkHref="/food-partner/register"
    />
  )
}

export default FoodPartnerLoginPage
