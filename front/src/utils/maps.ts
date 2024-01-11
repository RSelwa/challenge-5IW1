import type { PlaceGeometryData, PlaceData } from "@/types/maps";
import type { EmployeesWithId } from "@/types/withId";
import { tranformEntityArrayToObject } from ".";

export const normalizeMapsPlaceData = (placeData: google.maps.places.PlaceResult): PlaceData => {
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

export const getGeometryDataFromAddress = async (address: string): Promise<PlaceGeometryData | undefined> => {
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

export const getGeometryDataObjectFromEmployeeList = (employeeList: EmployeesWithId[]) => {
  const employeeListWithGeometry = employeeList.map((employee: EmployeesWithId) => {
    return {
      id: employee.id,
      lat: employee.establishment.lat,
      lng: employee.establishment.lng
    }
  })
  return tranformEntityArrayToObject(employeeListWithGeometry)
}