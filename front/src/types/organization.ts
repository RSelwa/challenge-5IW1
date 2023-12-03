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
type OrganizationStatus = "PENDING"
