import type {
  EmployeeSpecificSchedulesWithId,
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
  // service: Services
}
