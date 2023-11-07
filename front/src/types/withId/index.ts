import { Admin } from "@/types/admin"
import { Clinic } from "@/types/clinic"
import { Invitation } from "@/types/invitations"
import { Organization } from "@/types/organization"
import { Practitioner } from "@/types/practitioner"
import { Prestations } from "@/types/prestations"
import { Reservation } from "@/types/reservations"
import { Client } from "@/types/users"

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
