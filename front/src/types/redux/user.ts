import type { RoleUser } from "@/types/redux/token"

export type reduxStatus = RoleUser | "VISTOR"

export type reduxUserFront = {
  email: string
  status: reduxStatus[]
}
