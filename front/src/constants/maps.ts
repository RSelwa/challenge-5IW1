import { type Libraries } from "@react-google-maps/api"
import type { PlaceGeometryData } from "@/types/maps"

export const defaultLocation: PlaceGeometryData = {
  lat: 48.8374272,
  lng: 2.3658496
}

export const placesLibrary = ["places"] as Libraries
export const containerStyle = {
  width: "400px",
  height: "600px"
}
