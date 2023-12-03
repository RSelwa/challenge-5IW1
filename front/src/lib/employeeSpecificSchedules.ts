import type { EmployeeSpecificSchedulesWithId } from "@/types/withId"
import { requestOptions } from "@/utils/db"

export const fetchEmployeeSpecificSchedules = async (): Promise<
  EmployeeSpecificSchedulesWithId[]
> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/employee_specific_schedules`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const employeeSpecificSchedules: EmployeeSpecificSchedulesWithId[] =
    await response.json()
  return employeeSpecificSchedules
}
export const fetchEmployeeSpecificSchedule = async (
  id: string
): Promise<EmployeeSpecificSchedulesWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/employee_specific_schedules/${id}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: EmployeeSpecificSchedulesWithId = await response.json()
  return organization
}
