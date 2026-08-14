import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateFood() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    description: '',
    video: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value, files } = event.target

    if (name === 'video') {
      setForm((prev) => ({ ...prev, video: files[0] || null }))
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name || !form.video) {
      setError('Please enter a food name and select a video.')
      return
    }

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('video', form.video)

    try {
      setLoading(true)
      setError('')

      await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      window.dispatchEvent(new Event('food-uploaded'))
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to upload food video.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b0b0f',
      color: '#fff',
      padding: '24px'
    }}>
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        maxWidth: '500px',
        background: '#12131a',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '18px',
        padding: '28px',
        boxShadow: '0 18px 60px rgba(0,0,0,0.4)'
      }}>
        <h2 style={{ margin: '0 0 20px', fontSize: '2rem' }}>Upload Food Reel</h2>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#d8d8d8' }}>Food name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Crispy Burger"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #2a2d35', background: '#17191f', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#d8d8d8' }}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add a short description"
              rows="4"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #2a2d35', background: '#17191f', color: '#fff', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#d8d8d8' }}>Video file</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #2a2d35', background: '#17191f', color: '#fff' }}
            />
          </div>

          {error && (
            <div style={{ color: '#ff8a8a', fontSize: '0.95rem' }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: 'none',
              background: '#ff4d4d',
              color: '#fff',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateFood
