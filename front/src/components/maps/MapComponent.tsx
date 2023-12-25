import React, { useContext, useEffect, useState } from "react"
import type { MapsLocationData } from "@/types/maps"
import { defaultLocation } from "@/constants/maps"
import { GoogleMap } from '@react-google-maps/api';
import { GoogleMapAPIContext } from "@/App";

const MapComponent = () => {
  const { isLoaded } = useContext(GoogleMapAPIContext)
  const [userLocation, setUserLocation] =
    useState<MapsLocationData>(defaultLocation)

  const getCurrentPositionSuccess = (position: GeolocationPosition) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess)
  }, [])

  return (
    <div className="sticky top-3 h-full max-h-[600px] w-full self-start">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={15}
        >
        </GoogleMap>
      ) : <></>
    }
    </div>
  )
}

export default MapComponent
