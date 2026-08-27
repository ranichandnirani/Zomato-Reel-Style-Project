import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bookmark, Heart } from 'lucide-react'
import '../../styles/saved.css'

const Saved = () => {
  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSavedItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/food/saved', {
        withCredentials: true,
      })
      const items = Array.isArray(response.data?.savedItems)
        ? response.data.savedItems
        : []
      setSavedItems(items)
    } catch (error) {
      console.error('Failed to fetch saved items:', error)
      setSavedItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSavedItems()
  }, [])

  if (loading) {
    return (
      <div className="saved-page">
        <div className="saved-header">
          <h1>Saved</h1>
        </div>
        <div className="saved-loading">Loading your saved items…</div>
      </div>
    )
  }

  return (
    <div className="saved-page" id="saved-page">
      <div className="saved-header">
        <h1>Saved</h1>
        <p>{savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      {savedItems.length === 0 ? (
        <div className="saved-empty">
          <Bookmark size={56} strokeWidth={1.2} />
          <h2>No saved items yet</h2>
          <p>Tap the bookmark icon on any reel to save it here.</p>
        </div>
      ) : (
        <div className="saved-grid">
          {savedItems.map((item) => (
            <div key={item._id} className="saved-grid-item">
              <video
                src={item.video || item.src || item.url}
                muted
                playsInline
                preload="metadata"
                loop
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0 }}
              />
              <div className="saved-grid-item__overlay">
                <span>
                  <Heart size={12} fill="#fff" />
                  {item.likeCount || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved
