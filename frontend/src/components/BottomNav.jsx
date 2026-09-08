import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Home, Bookmark, UserCircle } from 'lucide-react'
import axios from 'axios'
import '../styles/bottomnav.css'

const BottomNav = () => {
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loadUser = () => {
      axios.get('http://localhost:3000/api/auth/user/me', { withCredentials: true })
        .then((response) => setUser(response.data.user))
        .catch(() => setUser(null))
    }

    loadUser()
    window.addEventListener('profile-updated', loadUser)
    return () => window.removeEventListener('profile-updated', loadUser)
  }, [])

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

      <NavLink
        to="/profile"
        className={`bottom-nav__link bottom-nav__link--profile ${location.pathname === '/profile' ? 'bottom-nav__link--active' : ''}`}
        id="nav-profile"
      >
        {user?.avatar ? (
          <img className="bottom-nav__avatar" src={user.avatar} alt="" />
        ) : (
          <UserCircle size={22} strokeWidth={location.pathname === '/profile' ? 2.5 : 1.8} />
        )}
        <span>{user?.name || 'Profile'}</span>
      </NavLink>
    </nav>
  )
}

export default BottomNav
