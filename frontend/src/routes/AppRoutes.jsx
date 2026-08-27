import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegisterPage.jsx'
import UserLogin from '../pages/auth/UserLoginPage.jsx'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegisterPage.jsx'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLoginPage.jsx'
import Home from '../pages/general/Home.jsx'
import Saved from '../pages/general/Saved.jsx'
import CreateFood  from '../pages/food-partner/CreateFood.jsx'
import Profile from '../pages/food-partner/Profile.jsx'
import BottomNav from '../components/BottomNav.jsx'

/* Show BottomNav only on Home and Saved pages */
const BottomNavWrapper = () => {
  const location = useLocation()
  const showNav = ['/', '/saved'].includes(location.pathname)
  return showNav ? <BottomNav /> : null
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path='/create-food' element={<CreateFood />} />
        <Route path='/food-partner/:id' element={<Profile/> } />
      </Routes>
      <BottomNavWrapper />
    </Router>
  )
}

export default AppRoutes
