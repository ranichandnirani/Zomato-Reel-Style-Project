import React, { useEffect, useState } from 'react'
import '../../styles/Profile.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {

  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);
  const [ videos, setVideos ] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        setProfile(response.data.foodPartner)
        setVideos(response.data.foodItems)
      })
      .catch(() => {
        setError(true)
      })
  }, [id])

  if (error) {
    return <div className="profile-container">Could not load this profile.</div>
  }

  if (!profile) {
    return <div className="profile-container">Loading...</div>
  }

  return (
    <div className="profile-container">
      <div className="profile-top-card">
        <div className="profile-header">
          <div className="profile-avatar"></div>
          <div className="profile-details-container">
            <div className="profile-badge badge-business">{profile.name}</div>
            <div className="profile-badge badge-address">{profile.address}</div>
          </div>
        </div>

        <hr className="profile-divider" />

        <div className="profile-stats">
          <div className="profile-stat-group">
            <div className="stat-label">Total Meals</div>
            <div className="stat-value">{profile.foods?.length ?? 0}</div>
          </div>
          <div className="profile-stat-group">
            <div className="stat-label">Customers served</div>
            <div className="stat-value">{profile.customersServed}</div>
          </div>
        </div>
      </div>
      <hr className="profile-sep"  />
      <div className="profile-video-grid">
        {(profile.foodItems || []).map((video) => (
          <div key={video._id} className="video-grid-item">
            <video 
              style={{objectFit:'cover', width: '100%', height:'100%'}} 
              src={video.video} muted>
                Video
            </video>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile