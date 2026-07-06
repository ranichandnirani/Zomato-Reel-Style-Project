import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'
import axios from 'axios'

const UserRegisterPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post('http://localhost:3000/api/auth/user/register', {
      name: firstName + ' ' + lastName,
      email,
      password
    }, {})
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up to discover meals, save favorites, and order with ease."
      roleLabel="User"
      accentLabel="User access"
      isRegister
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/user/login"
    />
  )
}

export default UserRegisterPage
