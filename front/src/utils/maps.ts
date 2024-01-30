import type { PlaceData, PlaceGeometryData } from "@/types/maps"
import type { EmployeesWithId } from "@/types/withId"
import { tranformEntityArrayToObject } from "."

export const normalizeMapsPlaceData = (
  placeData: google.maps.places.PlaceResult
): PlaceData => {
  const lat = placeData.geometry?.location?.lat() as number
  const lng = placeData.geometry?.location?.lng() as number
  const address = placeData.formatted_address

  return {
    address,
    geometry: {
      lat,
      lng
    }
  }
}

export const getGeometryDataFromAddress = async (
  address: string
): Promise<PlaceGeometryData | undefined> => {
  try {
    const { geocode } = new google.maps.Geocoder()
    const placeResult = await geocode({ address })
    const geometryData = placeResult.results[0].geometry

    return {
      lat: geometryData.location.lat(),
      lng: geometryData.location.lng()
    }
  } catch (e) {
    console.error(e)
  }
}

export const getGeometryDataObjectFromEmployeeList = (
  employeeList: EmployeesWithId[]
) => {
  const employeeListWithGeometry = employeeList.map(
    (employee: EmployeesWithId) => {
      return {
        id: employee.id,
        lat: employee.establishment.lat,
        lng: employee.establishment.lng
      }
    }
  )
  return tranformEntityArrayToObject(employeeListWithGeometry)
}

export const getDistanceBetweenTwoPoints = (
  pointA: PlaceGeometryData,
  pointB: PlaceGeometryData
): number => {
  const earthRadius = 6371
  const latDistance = ((pointB.lat - pointA.lat) * Math.PI) / 180
  const lngDistance = ((pointB.lng - pointA.lng) * Math.PI) / 180
  const a =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
    Math.cos((pointA.lat * Math.PI) / 180) *
      Math.cos((pointB.lat * Math.PI) / 180) *
      Math.sin(lngDistance / 2) *
      Math.sin(lngDistance / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distanceInMeters = earthRadius * c * 1000

  return distanceInMeters
}

export const isPlaceInRadius = (
  place: PlaceGeometryData,
  radiusInKm: number,
  placeToCompare: PlaceGeometryData
): boolean => {
  return (
    getDistanceBetweenTwoPoints(place, placeToCompare) <=
    (radiusInKm + 0.5) * 1000
  )
}
