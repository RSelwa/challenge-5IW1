import React, { useEffect, useState } from "react"
import GoogleMapReact from "google-map-react"
import type { MapsLocationData } from "@/types/maps"
import { defaultLocation } from "@/constants/maps"

const MapComponent = () => {
  const [userLocation, setUserLocation] =
    useState<MapsLocationData>(defaultLocation)

  const getCurrentPositionSuccess = (position: GeolocationPosition) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess)
  }, [])

  return (
    // Important! Always set the container height explicitly
    <div className="sticky top-3 h-full max-h-[600px] w-full self-start  ">
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_KEY_GOOGLE_MAPS }}
        defaultCenter={defaultLocation}
        defaultZoom={14}
        center={userLocation}
      />
    </div>
  )
}

export default MapComponent
