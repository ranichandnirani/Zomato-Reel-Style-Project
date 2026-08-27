import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, Bookmark } from 'lucide-react'
import '../styles/bottomnav.css'

const BottomNav = () => {
  const location = useLocation()

  return (
    <nav className="bottom-nav" id="bottom-nav">
      <NavLink
        to="/"
        className={`bottom-nav__link ${location.pathname === '/' ? 'bottom-nav__link--active' : ''}`}
        id="nav-home"
      >
        <Home size={22} strokeWidth={location.pathname === '/' ? 2.5 : 1.8} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/saved"
        className={`bottom-nav__link ${location.pathname === '/saved' ? 'bottom-nav__link--active' : ''}`}
        id="nav-saved"
      >
        <Bookmark
          size={22}
          strokeWidth={location.pathname === '/saved' ? 2.5 : 1.8}
          fill={location.pathname === '/saved' ? 'currentColor' : 'none'}
        />
        <span>Saved</span>
      </NavLink>
    </nav>
  )
}

export default BottomNav
