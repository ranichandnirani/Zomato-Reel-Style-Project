import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Camera, Check, Pencil } from 'lucide-react'
import '../../styles/user-profile.css'

const UserProfile = () => {
  const [profile, setProfile] = useState(null)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:3000/api/auth/user/me', { withCredentials: true })
      .then((response) => {
        setProfile(response.data.user)
        setName(response.data.user.name || '')
        setAvatarPreview(response.data.user.avatar || '')
      })
      .catch(() => setMessage('Please log in to edit your profile.'))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage('')

    const formData = new FormData()
    formData.append('fullName', name)
    if (avatar) formData.append('avatar', avatar)

    try {
      const response = await axios.put(
        'http://localhost:3000/api/auth/user/profile',
        formData,
        { withCredentials: true }
      )
      setProfile(response.data.user)
      setName(response.data.user.name)
      setAvatar(null)
      setAvatarPreview(response.data.user.avatar || '')
      window.dispatchEvent(new Event('profile-updated'))
      setMessage('Profile updated successfully.')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not update profile.')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setAvatar(file)
    setAvatarPreview(URL.createObjectURL(file))
    setMessage('Press Save profile to upload this photo.')
  }

  if (loading) return <div className="user-profile-page">Loading profile...</div>

  return (
    <main className="user-profile-page">
      <form className="user-profile-card" onSubmit={handleSubmit}>
        <div className="user-profile-avatar-wrap">
          {avatarPreview ? (
            <img className="user-profile-avatar" src={avatarPreview} alt="Your profile" />
          ) : (
            <div className="user-profile-avatar user-profile-avatar--empty">
              {name.charAt(0).toUpperCase() || '?'}
            </div>
          )}
          <button
            type="button"
            className="user-profile-camera"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Change profile photo"
          >
            <Camera size={17} />
          </button>
          <input
            ref={fileInputRef}
            className="user-profile-file-input"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="user-profile-fields">
          <p className="user-profile-eyebrow">Your account</p>
          <div className="user-profile-name-row">
            <input
              className="user-profile-name-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-label="Your name"
              required
            />
            <Pencil size={17} aria-hidden="true" />
          </div>
          <button className="user-profile-save" type="submit" disabled={saving}>
            {saving ? 'Saving...' : <><Check size={17} /> Save profile</>}
          </button>
          {message && <p className="user-profile-message">{message}</p>}
        </div>
      </form>
    </main>
  )
}

export default UserProfile
