import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
  const [videos, setVideos] = useState([])

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/food',
        { withCredentials: true }
      )
      const foodItems = Array.isArray(response.data?.foodItems) ? response.data.foodItems : []
      setVideos(foodItems)
    } catch (error) {
      setVideos([])
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVideos()

    const interval = setInterval(fetchVideos, 4000)
    const refreshListener = () => fetchVideos()

    window.addEventListener('food-uploaded', refreshListener)

    return () => {
      clearInterval(interval)
      window.removeEventListener('food-uploaded', refreshListener)
    }
  }, [])

  async function likeVideo(item) {
    const response = await axios.post(
      'http://localhost:3000/api/food/like',
      { foodId: item._id },
      { withCredentials: true }
    )

    const nowLiked = response.data.like

    setVideos((prev) =>
      prev.map((video) =>
        video._id === item._id
          ? {
              ...video,
              isLiked: nowLiked,
              // derive the count from the toggle direction, don't depend on
              // the backend sending likeCount back
              likeCount: Math.max((video.likeCount || 0) + (nowLiked ? 1 : -1), 0),
            }
          : video
      )
    )
  }

  async function saveVideo(item) {
    const response = await axios.post(
      'http://localhost:3000/api/food/save',
      { foodId: item._id },
      { withCredentials: true }
    )

    const nowSaved = response.data.save

    setVideos((prev) =>
      prev.map((video) =>
        video._id === item._id
          ? {
              ...video,
              isSaved: nowSaved,
              savesCount: Math.max((video.savesCount || 0) + (nowSaved ? 1 : -1), 0),
            }
          : video
      )
    )
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  )
}

export default Home