import type {
  EmployeeSpecificSchedulesWithId,
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
  category: string
  services: (ServicesWithId & { slots: SlotsWithId })[]
}
