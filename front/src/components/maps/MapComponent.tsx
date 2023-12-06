import React from "react"
import GoogleMapReact from "google-map-react"
import { defaultLocation } from "@/constants/maps"

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: defaultLocation.lat,
      lng: defaultLocation.lng
    },
    zoom: 14
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_KEY_GOOGLE_MAPS }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      />
    </div>
  )
}
