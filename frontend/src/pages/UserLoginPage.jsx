import React from 'react'
import AuthCard from '../components/AuthCard.jsx'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLoginPage = () => {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    // const firstName = e.target.firstName.value;
    // const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/login', {
      // fullName: firstName + ' ' + lastName,
      email,
      password
    }, {
      withCredentials: true
    }) 

    console.log(response.data);
    navigate("/");

  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue exploring your next favorite meal."
      roleLabel="User"
      accentLabel="User access"
      footerText="New here?"
      footerLinkLabel="Create account"
      footerLinkHref="/user/register"
    />
  )
}

export default UserLoginPage
