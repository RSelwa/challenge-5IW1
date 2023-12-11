<<<<<<< Updated upstream
import type { RoleUser } from "@/types/redux/token"

export type reduxStatus = RoleUser | "VISTOR"

export type reduxUserFront = {
  email: string
  status: reduxStatus[]
}
=======
export type reduxStatus = "vistitor" | "client" | "practitioner" | "admin"

export type reduxUserFront = {
  email: string
  status: reduxStatus
}
>>>>>>> Stashed changes
