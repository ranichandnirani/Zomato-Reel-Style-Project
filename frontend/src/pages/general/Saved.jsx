import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bookmark, Heart, X } from 'lucide-react'
import '../../styles/saved.css'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)

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

  const selectedItem = savedItems.find((item) => item._id === selectedId)

  async function likeVideo(item) {
    const response = await axios.post(
      'http://localhost:3000/api/food/like',
      { foodId: item._id },
      { withCredentials: true }
    )

    const nowLiked = response.data.like
    setSavedItems((prev) => prev.map((video) => (
      video._id === item._id
        ? {
            ...video,
            like: nowLiked,
            likeCount: Math.max((video.likeCount || 0) + (nowLiked ? 1 : -1), 0),
          }
        : video
    )))
  }

  async function saveVideo(item) {
    await axios.post(
      'http://localhost:3000/api/food/save',
      { foodId: item._id },
      { withCredentials: true }
    )
    setSavedItems((prev) => prev.filter((video) => video._id !== item._id))
    setSelectedId(null)
  }

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
            <div
              key={item._id}
              className="saved-grid-item"
              onClick={() => setSelectedId(item._id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') setSelectedId(item._id)
              }}
            >
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
                  <Heart size={12} fill="#ff4d4f" color='none'/>
                  {item.likeCount || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="saved-reel-viewer" role="dialog" aria-modal="true">
          <button
            type="button"
            className="saved-reel-viewer__close"
            onClick={() => setSelectedId(null)}
            aria-label="Close saved reel"
          >
            <X size={24} />
          </button>
          <ReelFeed
            items={[selectedItem]}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No saved videos yet."
          />
        </div>
      )}
    </div>
  )
}

export default Saved
