import React, { useState, useRef, useEffect } from 'react'
import '../../styles/Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const demoVideos = [
  {
    id: 'v1',
    src: 'https://ik.imagekit.io/nqkeezgjn/475648ec-342a-41fc-8fdb-c7962168c008_t-EL0WGFT',
    description: 'Smoky grilled kebabs fresh off the fire with special aromatic spices',
    storeUrl: '/create-food'
  },
  {
    id: 'v2',
    src: 'https://ik.imagekit.io/nqkeezgjn/475648ec-342a-41fc-8fdb-c7962168c008_t-EL0WGFT',
    description: 'Crisp garden salad with seasonal greens, crispy croutons and house dressing',
    storeUrl: '/create-food'
  },
  {
    id: 'v3',
    src: 'https://ik.imagekit.io/nqkeezgjn/475648ec-342a-41fc-8fdb-c7962168c008_t-EL0WGFT',
    description: 'Single-origin pour-over with hints of chocolate and berry notes',
    storeUrl: '/create-food'
  },
  {
    id: 'v4',
    src: 'https://ik.imagekit.io/nqkeezgjn/475648ec-342a-41fc-8fdb-c7962168c008_t-EL0WGFT',
    description: 'Handmade pasta with truffle cream sauce and fresh parmesan cheese',
    storeUrl: '/create-food'
  }
]

const  Home = () => {
  // const [ videos, setVideos ] = useState(demoVideos)
  // const videoRefs = useRef(new Map())
  // const containerRef = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:3000/api/food')
  })



  const handleVisitStore = (storeUrl) => {
    navigate(storeUrl)
  }

  return (
    <div className="home-container">
      <div className="reels-container">
        {demoVideos.map((demoVideos) => (
          <div key={demoVideos.id} className="reel-item">
            <div className="reel-video">
              <video src={demoVideos.src} alt={demoVideos.description} autoPlay loop playsInline muted/>
            </div>
            
            <div className="reel-overlay">
              <div className="reel-info">
                <p className="reel-description">{demoVideos.description}</p>
                <button className="reel-button" onClick={() => handleVisitStore(demoVideos.storeUrl)}>
                  Visit store
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
