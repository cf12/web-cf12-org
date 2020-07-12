import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

import styles from './Map.scss'

const Map = ({ lat, lon }) => {
  const [ viewport , setViewport ] = useState({
    latitude: lat,
    longitude: lon,
    zoom: 10
  })

  if (!lat && !lon) {
    return (
      <div className={styles.blank}>
        <p>Map not available</p>
      </div>
    )
  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      width='100%'
      height='100%'
    />
  )
}

export default Map