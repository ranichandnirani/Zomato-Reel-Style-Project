import React, { useEffect, useRef, useState } from 'react'
import { X, Send, ThumbsUp, ThumbsDown } from 'lucide-react'
import axios from 'axios'

// Renders a bottom sheet of comments for a single food item.
// Self-contained: fetches on open, posts new comments itself, and
// reports the updated count back up via onCommentPosted so the
// parent can bump the badge on the reel action button.
const CommentsSheet = ({ foodId, onClose, onCommentPosted }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function loadComments() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/food/comments/${foodId}`,
          { withCredentials: true }
        )
        if (!cancelled) setComments(res.data.comments || [])
      } catch (err) {
        console.error('Failed to load comments', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadComments()
    return () => { cancelled = true }
  }, [foodId])

  const handleSend = async () => {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    setSending(true)
    try {
      const res = await axios.post(
        `http://localhost:3000/api/food/${foodId}/comments`,
        { text: trimmed },
        { withCredentials: true }
      )
      const newComment = res.data.comment
      setComments((prev) => [...prev, newComment])
      setText('')
      if (onCommentPosted) onCommentPosted(foodId)
    } catch (err) {
      console.error('Failed to post comment', err)
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  const handleReaction = async (comment, reaction) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/food/comments/${comment._id}/reaction`,
        { reaction },
        { withCredentials: true }
      )
      setComments((prev) => prev.map((item) => (
        item._id === comment._id
          ? { ...item, ...res.data }
          : item
      )))
    } catch (err) {
      console.error('Failed to react to comment', err)
    }
  }

  const initials = (name) =>
    (name || '?').trim().charAt(0).toUpperCase()

  return (
    <>
      <div className="comments-backdrop" onClick={onClose} />
      <div className="comments-sheet" role="dialog" aria-label="Comments">
        <div className="comments-sheet-header">
          <h3>Comments</h3>
          <button className="comments-close-btn" onClick={onClose} aria-label="Close comments">
            <X size={22} />
          </button>
        </div>

        <div className="comments-list">
          {loading && <p className="comments-empty">Loading comments...</p>}

          {!loading && comments.length === 0 && (
            <p className="comments-empty">No comments yet. Be the first!</p>
          )}

          {!loading && comments.map((c) => (
            <div className="comment-item" key={c._id}>
              {c.user?.avatar ? (
                <img className="comment-avatar" src={c.user.avatar} alt="" />
              ) : (
                <div className="comment-avatar">{initials(c.user?.fullName)}</div>
              )}
              <div className="comment-body">
                <span className="comment-author">{c.user?.fullName || 'User'}</span>
                <span className="comment-text">{c.text}</span>
              </div>
              <div className="comment-actions">
                <button className={c.reaction === 'like' ? 'comment-reaction active' : 'comment-reaction'} onClick={() => handleReaction(c, 'like')} aria-label="Like comment">
                  <ThumbsUp size={15} /> <span>{c.likeCount || 0}</span>
                </button>
                <button className={c.reaction === 'dislike' ? 'comment-reaction active' : 'comment-reaction'} onClick={() => handleReaction(c, 'dislike')} aria-label="Dislike comment">
                  <ThumbsDown size={15} /> <span>{c.dislikeCount || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="comments-input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="comments-send-btn"
            onClick={handleSend}
            disabled={!text.trim() || sending}
            aria-label="Send comment"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  )
}

export default CommentsSheet