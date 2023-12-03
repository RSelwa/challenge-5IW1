import type { Admin } from "@/types/admin"
import type { Clinic } from "@/types/clinic"
import type { Employees } from "@/types/employees"
import type { EmployeeSpecificSchedules } from "@/types/employeeSpecificSchedule"
import type { Establishments } from "@/types/establishment"
import type { Invitation } from "@/types/invitations"
import type { Organizations } from "@/types/organization"
import type { Practitioner } from "@/types/practitioner"
import type { Prestations } from "@/types/prestations"
import type { Reservation } from "@/types/reservations"
import type { Services } from "@/types/services"
import type { Slots } from "@/types/slots"
import type { Users } from "@/types/users"

export type AdminWithId = DocumentWithId<Admin>
export type UsersWithId = DocumentWithId<Users>
export type SlotsWithId = DocumentWithId<Slots>
export type ServicesWithId = DocumentWithId<Services>
export type OrganizationsWithId = DocumentWithId<Organizations>
export type EstablishmentsWithId = DocumentWithId<Establishments>
export type EmployeesWithId = DocumentWithId<Employees>
export type EmployeeSpecificSchedulesWithId =
  DocumentWithId<EmployeeSpecificSchedules>

export type PractitionerWithId = DocumentWithId<Practitioner>
export type InvitationWithId = DocumentWithId<Invitation>
export type ClinicWithId = DocumentWithId<Clinic>

export type PrestationsWithId = DocumentWithId<Prestations>
export type ReservationWithId = DocumentWithId<Reservation>

export type DocumentWithId<T> = {
  id: string
} & T
