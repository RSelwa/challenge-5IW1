import { Admin } from "@/monorepo/types/admin"
import { Clinic } from "@/monorepo/types/clinic"
import { Invitation } from "@/monorepo/types/invitations"
import { Organization } from "@/monorepo/types/organization"
import { Practitioner } from "@/monorepo/types/practitioner"
import { Prestations } from "@/monorepo/types/prestations"
import { Reservation } from "@/monorepo/types/reservations"
import { Client } from "@/monorepo/types/users"

export type AdminWithId = DocumentWithId<Admin>
export type ClientWithId = DocumentWithId<Client>

export type PractitionerWithId = DocumentWithId<Practitioner>
export type InvitationWithId = DocumentWithId<Invitation>
export type ClinicWithId = DocumentWithId<Clinic>
export type OrganizationWithId = DocumentWithId<Organization>

export type PrestationsWithId = DocumentWithId<Prestations>
export type ReservationWithId = DocumentWithId<Reservation>

export type DocumentWithId<T> = {
  id: number
} & T
