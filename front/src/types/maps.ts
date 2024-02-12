export interface PlaceData {
  address: string | undefined
  geometry: PlaceGeometryData
}

export interface PlaceGeometryData {
  lat: number
  lng: number
}