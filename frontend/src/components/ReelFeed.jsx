import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Bookmark, Share2, MessageCircle } from 'lucide-react'
import CommentsSheet from './CommentsSheet'
import '../styles/reels.css'

const ReelFeed = ({ items, onLike, onSave, onShare, emptyMessage }) => {
  const containerRef = useRef(null)
  const videoRefs = useRef(new Map())
  const [activeIndex, setActiveIndex] = useState(0)
  const [pendingIds, setPendingIds] = useState(new Set())
  const [commentCounts, setCommentCounts] = useState({})
  const [openCommentsFor, setOpenCommentsFor] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPosition = container.scrollTop
      const itemHeight = window.innerHeight
      const index = Math.round(scrollPosition / itemHeight)
      setActiveIndex(index)

      videoRefs.current.forEach((video) => {
        if (video) video.pause()
      })

      const activeVideo = videoRefs.current.get(index)
      if (activeVideo) {
        activeVideo.play().catch(() => {})
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLike = async (item) => {
    if (pendingIds.has(item._id)) return
    setPendingIds((prev) => new Set(prev).add(item._id))
    try {
      if (onLike) await onLike(item)
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev)
        next.delete(item._id)
        return next
      })
    }
  }

  const handleSave = async (item) => {
    if (pendingIds.has(item._id)) return
    setPendingIds((prev) => new Set(prev).add(item._id))
    try {
      if (onSave) await onSave(item)
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev)
        next.delete(item._id)
        return next
      })
    }
  }

  // const handleShare = async (item) => {
  //   const url = `${window.location.origin}/reel/${item._id}`
  //   try {
  //     if (navigator.share) {
  //       await navigator.share({ title: item.name, text: item.description, url })
  //     } else {
  //       await navigator.clipboard.writeText(url)
  //     }
  //   } catch (err) {
  //     // user cancelled the native share sheet - not an error worth logging
  //   }
  //   if (onShare) onShare(item)
  // }

  const handleVisitStore = (item) => {
    // foodPartner may come through as a raw ObjectId string, or as a
    // populated object ({ _id, name, ... }) if the backend route ever
    // starts using .populate('foodPartner') - handle both.
    const partnerId =
      typeof item.foodPartner === 'object' && item.foodPartner !== null
        ? item.foodPartner._id
        : item.foodPartner

    if (!partnerId) return
    navigate(`/food-partner/${partnerId}`)
  }

  const handleCommentPosted = (foodId) => {
    setCommentCounts((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] ?? 0) + 1
    }))
  }

  const getCommentCount = (item) =>
    commentCounts[item._id] ?? item.commentsCount ?? 0

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
              src={item.video || item.src || item.url}
              className="reel-video"
              loop
              muted
              playsInline
              preload='metadata'
              autoPlay
            />

            <div className="reel-overlay">
              <div className="reel-info">
                <p className="reel-description">{item.description}</p>
                <button className="reel-button" onClick={() => handleVisitStore(item)}>
                  Visit store
                </button>
              </div>

              <div className="reel-actions">
                <button
                  className="reel-action-btn like-btn"
                  onClick={() => handleLike(item)}
                  title="Like"
                >
                  <Heart
                    size={24}
                    strokeWidth={2}
                    fill={item.like ? '#ff4d4f' : 'none'}
                    color={item.like ? '#ff4d4f' : 'currentColor'}
                  />
                  <span className="action-count">{item.likeCount || 0}</span>
                </button>

                <button
                  className="reel-action-btn comment-btn"
                  onClick={() => setOpenCommentsFor(item._id)}
                  title="Comment"
                >
                  <MessageCircle size={24} strokeWidth={2} />
                  <span className="action-count">{getCommentCount(item)}</span>
                </button>

                <button
                  className="reel-action-btn save-btn"
                  onClick={() => handleSave(item)}
                  title="Save"
                >
                  <Bookmark
                    size={24}
                    strokeWidth={2}
                    fill={item.save ? '#ffffff' : 'none'}
                    color={item.save ? '#ffffff' : 'currentColor'}
                  />
                  <span className="action-count">{item.saveCount || 0}</span>
                </button>

                {/* <button
                  className="reel-action-btn share-btn"
                  onClick={() => handleShare(item)}
                  title="Share"
                >
                  <Share2 size={24} strokeWidth={2} />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}

      {openCommentsFor && (
        <CommentsSheet
          foodId={openCommentsFor}
          onClose={() => setOpenCommentsFor(null)}
          onCommentPosted={handleCommentPosted}
        />
      )}
    </div>
  )
}

export default ReelFeed