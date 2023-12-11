<<<<<<< Updated upstream
import type { Admin } from "@/types/admin"
import type { Employees } from "@/types/api/employees"
import type { EmployeeSpecificSchedules } from "@/types/api/employeeSpecificSchedule"
import type { Establishments } from "@/types/api/establishment"
import type { Organizations } from "@/types/api/organization"
import type { Services } from "@/types/api/services"
import type { Slots } from "@/types/api/slots"
import type { Users } from "@/types/api/users"

export type AdminWithId = DocumentWithId<Admin>
export type UsersWithId = DocumentWithId<Users>
export type SlotsWithId = DocumentWithId<Slots>
export type ServicesWithId = DocumentWithId<Services>
export type OrganizationsWithId = DocumentWithId<Organizations>
export type EstablishmentsWithId = DocumentWithId<Establishments>
export type EmployeesWithId = DocumentWithId<Employees>
export type EmployeeSpecificSchedulesWithId =
  DocumentWithId<EmployeeSpecificSchedules>

export type DocumentWithId<T> = {
  id: string
} & T
=======
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
>>>>>>> Stashed changes
