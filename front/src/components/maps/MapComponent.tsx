import React, { useEffect, useRef } from "react"

type Props = {}

const MapComponent = (props: Props) => {
  const center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  }
  const zoom: number = 0
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center,
      zoom
    })
  }, [])

  return <div ref={ref} id="map" />
}

export default MapComponent
