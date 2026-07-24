import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerRegisterPage = () => {
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
    navigate('/')
  }

  return (
    <AuthCard
      title="Join as a food partner"
      subtitle="Grow your reach with a simple, polished presence for your kitchen."
      roleLabel="Food Partner"
      accentLabel="Food partner access"
      isRegister
      onSubmit={handleSubmit}
      footerText="Already partnered with us?"
      footerLinkLabel="Sign in"
      footerLinkHref="/food-partner/login"
    />
  )
}

export default FoodPartnerRegisterPage
