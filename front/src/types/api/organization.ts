import type { EstablishmentsWithId } from "@/types/withId"

export type Organizations = {
  name: string
  managerFirstname: string
  managerLastname: string
  kbis: string
  siret: string
  email: string
  status: OrganizationStatus
  establishments: EstablishmentsWithId[]
}
export type OrganizationPost = {
  name: string
  managerFirstname: string
  managerLastname: string
  kbisFile: string
  siret: string
  email: string
  plainPassword: string
}
type OrganizationStatus = "PENDING" | "VALIDATED" | "REFUSED"
