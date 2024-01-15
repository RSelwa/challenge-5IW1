import type { RoleUser } from "@/types/redux/token"
import { type MapsPlaceData } from "../maps"

export type reduxStatus = RoleUser | "VISTOR"

export type reduxUserFront = {
  email: string
  status: reduxStatus[]
  searchPlace: MapsPlaceData
}
