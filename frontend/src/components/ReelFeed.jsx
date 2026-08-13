import React, { useRef, useEffect, useState } from 'react'
import '../styles/reels.css'

const ReelFeed = ({ items, onLike, onSave, emptyMessage }) => {
  const containerRef = useRef(null)
  const videoRefs = useRef(new Map())
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPosition = container.scrollTop
      const itemHeight = window.innerHeight
      const index = Math.round(scrollPosition / itemHeight)
      setActiveIndex(index)

      // Pause all videos
      videoRefs.current.forEach((video) => {
        if (video) video.pause()
      })

      // Play active video
      const activeVideo = videoRefs.current.get(index)
      if (activeVideo) {
        activeVideo.play().catch(() => {
          // Handle autoplay restrictions
        })
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  if (!items || items.length === 0) {
    return (
      <div className="reel-feed-empty">
        <p>{emptyMessage || 'No content available'}</p>
      </div>
    )
  }

  return (
    <div className="reel-feed-container" ref={containerRef}>
      {items.map((item, index) => (
        <div key={item._id || index} className="reel-item">
          <div className="reel-video-wrapper">
            <video
              ref={(el) => {
                if (el) videoRefs.current.set(index, el)
                else videoRefs.current.delete(index)
              }}
              src={item.src || item.url}
              className="reel-video"
              loop
              muted
              playsInline
              autoPlay={index === 0}
            />
          </div>

          <div className="reel-overlay">
            <div className="reel-info">
              <p className="reel-description">{item.description}</p>
              <button className="reel-button">
                Visit store
              </button>
            </div>

            <div className="reel-actions">
              <button
                className="reel-action-btn like-btn"
                onClick={() => onLike && onLike(item)}
                title="Like"
              >
                <span className="action-icon">❤️</span>
                <span className="action-count">{item.likeCount || 0}</span>
              </button>

              <button
                className="reel-action-btn save-btn"
                onClick={() => onSave && onSave(item)}
                title="Save"
              >
                <span className="action-icon">💾</span>
                <span className="action-count">{item.savesCount || 0}</span>
              </button>

              <button className="reel-action-btn share-btn" title="Share">
                <span className="action-icon">🔗</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReelFeed
