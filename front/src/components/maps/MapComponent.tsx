import React, { useEffect, useRef, useState } from "react"

type Props = {
  center: google.maps.LatLngLiteral
  zoom: number
}

const MapComponent = ({ center, zoom }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    console.log(zoom, center)

    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  return <div ref={ref} id="map" />
}

export default MapComponent
