import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegisterPage from '../pages/UserRegisterPage.jsx'
import UserLoginPage from '../pages/UserLoginPage.jsx'
import FoodPartnerRegisterPage from '../pages/FoodPartnerRegisterPage.jsx'
import FoodPartnerLoginPage from '../pages/FoodPartnerLoginPage.jsx'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegisterPage />} />
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegisterPage />} />
        <Route path="/food-partner/login" element={<FoodPartnerLoginPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
