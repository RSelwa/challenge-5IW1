import type { MapsLocationData } from "@/types/maps"
import { type Libraries } from "@react-google-maps/api"

export const defaultLocation: MapsLocationData = {
  lat: 48.8374272,
  lng: 2.3658496
}

export const placesLibrary = ['places'] as Libraries
