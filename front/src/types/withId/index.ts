import type { Admin } from "@/types/admin"
import type { Employees } from "@/types/api/employees"
import type { EmployeeSpecificSchedules } from "@/types/api/employeeSpecificSchedule"
import type { Establishments } from "@/types/api/establishment"
import type { NotationType } from "@/types/api/notation"
import type { Organizations } from "@/types/api/organization"
import type { Reservation } from "@/types/api/reservations"
import type { Services } from "@/types/api/services"
import type { SemaineType, Slots } from "@/types/api/slots"
import type { Users } from "@/types/api/users"

export type AdminWithId = DocumentWithId<Admin>
export type UsersWithId = DocumentWithId<Users>
export type SlotsWithId = DocumentWithId<Slots>
export type NotationtionsWithId = DocumentWithId<NotationType>
export type ServicesWithId = DocumentWithId<Services>
export type OrganizationsWithId = DocumentWithId<Organizations>
export type EstablishmentsWithId = DocumentWithId<Establishments>
export type EmployeesWithId = DocumentWithId<Employees>
export type ReservationsWithId = DocumentWithId<Reservation>
export type SemaineTypeWithId = DocumentWithId<SemaineType>
export type EmployeeSpecificSchedulesWithId =
  DocumentWithId<EmployeeSpecificSchedules>

export type DocumentWithId<T> = {
  id: string
} & T
