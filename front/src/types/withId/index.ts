import type { Admin } from "@/monorepo/types/admin"
import type { Clinic } from "@/monorepo/types/clinic"
import type { Invitation } from "@/monorepo/types/invitations"
import type { Organization } from "@/monorepo/types/organization"
import type { Practitioner } from "@/monorepo/types/practitioner"
import type { Prestations } from "@/monorepo/types/prestations"
import type { Reservation } from "@/monorepo/types/reservations"
import type { Client } from "@/monorepo/types/users"

export type AdminWithId = DocumentWithId<Admin>
export type ClientWithId = DocumentWithId<Client>

export type PractitionerWithId = DocumentWithId<Practitioner>
export type InvitationWithId = DocumentWithId<Invitation>
export type ClinicWithId = DocumentWithId<Clinic>
export type OrganizationWithId = DocumentWithId<Organization>

export type PrestationsWithId = DocumentWithId<Prestations>
export type ReservationWithId = DocumentWithId<Reservation>

export type DocumentWithId<T> = {
  id: string
} & T
