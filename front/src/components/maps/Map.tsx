import React, { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { GoogleMap, Marker } from "@react-google-maps/api"
import type { PlaceGeometryData } from "@/types/maps"
import type { EmployeesWithId } from "@/types/withId"
import { containerStyle, defaultLocation } from "@/constants/maps"
import { getGeometryDataObjectFromEmployeeList } from "@/utils/maps"
import type { RootState } from "@/redux/store"
import { GoogleMapsAPIContext } from "@/App"

interface Props {
  employeeList: EmployeesWithId[]
}

const Map = ({ employeeList }: Props) => {
  const { isLoaded } = useContext(GoogleMapsAPIContext)

  const searchPlace = useSelector(
    (state: RootState) => state.user.searchPlace.geometry
  )
  const [userLocation, setUserLocation] =
    useState<PlaceGeometryData>(defaultLocation)
  const [placeGeometryData, setPlaceGeometryData] = useState<
    Record<string, PlaceGeometryData>
  >({})
  const mapCenter = searchPlace ?? userLocation

  const getCurrentPositionSuccess = (position: GeolocationPosition) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCurrentPositionSuccess)
  }, [])

  useEffect(() => {
    if (employeeList.length !== 0) {
      setPlaceGeometryData(getGeometryDataObjectFromEmployeeList(employeeList))
    }
  }, [employeeList])

  return (
    <div className="sticky top-3 h-full max-h-[600px] w-full self-start">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
          options={{
            streetViewControl: false,
            mapTypeControl: false
          }}
        >
          {employeeList.map((employee) => (
            <Marker
              key={employee.id}
              position={placeGeometryData[employee.id]}
            />
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Map
