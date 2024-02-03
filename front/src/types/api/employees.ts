import type {
  EmployeeSpecificSchedulesWithId,
  SlotsWithId
} from "@/types/withId"
import type { Establishments } from "./establishment"
import type { Services } from "./services"

export type Employees = {
  firstname: string
  lastname: string
  establishment: Establishments
  slots: SlotsWithId[]
  employeeSpecificSchedules: EmployeeSpecificSchedulesWithId[]
  service: Services
}

export type EmployeePost = {
  firstname: string
  lastname: string
  category: string
  email: string
  plainPassword: string
}
