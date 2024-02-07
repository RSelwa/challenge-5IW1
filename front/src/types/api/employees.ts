import type {
  EmployeeSpecificSchedulesWithId,
  SemaineTypeWithId,
  ServicesWithId,
  SlotsWithId
} from "@/types/withId"
import type { Establishments } from "./establishment"

export type Employees = {
  firstname: string
  lastname: string
  establishment: Establishments
  slots: SlotsWithId[]
  employeeSpecificSchedules: EmployeeSpecificSchedulesWithId[]
  employeeWeekSchedules: SemaineTypeWithId[]
  category: string
  services: (ServicesWithId & { slots: SlotsWithId })[]
}

export type EmployeePost = {
  firstname: string
  lastname: string
  category: string
  email: string
  plainPassword: string
  establishment: string
}
