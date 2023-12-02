import type { Admin } from "@/types/admin"
import type { Clinic } from "@/types/clinic"
import type { Invitation } from "@/types/invitations"
import type { Organization } from "@/types/organization"
import type { Practitioner } from "@/types/practitioner"
import type { Prestations } from "@/types/prestations"
import type { Reservation } from "@/types/reservations"
import type { Users } from "@/types/users"

export type AdminWithId = DocumentWithId<Admin>
export type UsersWithId = DocumentWithId<Users>

export type PractitionerWithId = DocumentWithId<Practitioner>
export type InvitationWithId = DocumentWithId<Invitation>
export type ClinicWithId = DocumentWithId<Clinic>
export type OrganizationWithId = DocumentWithId<Organization>

export type PrestationsWithId = DocumentWithId<Prestations>
export type ReservationWithId = DocumentWithId<Reservation>

export type DocumentWithId<T> = {
  id: string
} & T
