import type { PlaceData } from "@/types/maps"

export interface BaseEntity {
  id: string
}

export type SearchQuery = {
  service: string
  localisation: PlaceData
  radiusInKm: number
  // localisation: string
}
