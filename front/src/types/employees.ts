import type {
  EmployeeSpecificScheduleWithId,
  SlotsWithId
} from "@/types/withId"

export type Employees = {
  firstname: string
  lastname: string
  establishment: string
  slots: SlotsWithId[]
  employeeSpecificSchedules: EmployeeSpecificScheduleWithId[]
}
