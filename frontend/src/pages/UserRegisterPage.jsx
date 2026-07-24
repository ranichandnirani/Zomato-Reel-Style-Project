import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegisterPage = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullName: firstName + ' ' + lastName,
      email,
      password
    }, {
      withCredentials: true
    } )

    console.log(response.data);
    navigate("/")
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up to discover meals, save favorites, and order with ease."
      roleLabel="User"
      accentLabel="User access"
      isRegister
      onSubmit={handleSubmit}
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/user/login"
    />
  )
}

export default UserRegisterPage
