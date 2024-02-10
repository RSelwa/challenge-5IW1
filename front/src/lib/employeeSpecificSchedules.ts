import type { PostSpecificSchedule } from "@/types/api/employeeSpecificSchedule"
import type { EmployeeSpecificSchedulesWithId } from "@/types/withId"
import { EMPLOYEESPECIFICSCHEDULE_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchEmployeeSpecificSchedules = async (): Promise<
  EmployeeSpecificSchedulesWithId[]
> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEESPECIFICSCHEDULE_API_ROUTES}`,
    requestOptions({ method: "GET" })
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
    `${
      import.meta.env.VITE_API_URL
    }${EMPLOYEESPECIFICSCHEDULE_API_ROUTES}/${id}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: EmployeeSpecificSchedulesWithId = await response.json()
  return organization
}
export const editEmployeeSpecificSchedule = async (
  employeeSpecificSchedule: Partial<EmployeeSpecificSchedulesWithId>
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${EMPLOYEESPECIFICSCHEDULE_API_ROUTES}/${
        employeeSpecificSchedule.id
      }`,
      requestOptions({
        method: "PATCH",
        body: JSON.stringify(employeeSpecificSchedule)
      })
    )
    if (!response.ok) throw new Error("Something went wrong")
  } catch (error) {
    console.error(error)
  }
}
export const postEmployeeSpecificSchedule = async (
  employeeSpecificSchedule: PostSpecificSchedule
) => {
  try {
    const newHeader = new Headers()
    newHeader.append("Content-Type", "application/json")
    newHeader.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")?.replaceAll('"', "") || ""}`
    )
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${EMPLOYEESPECIFICSCHEDULE_API_ROUTES}`,
      {
        method: "POST",
        body: JSON.stringify(employeeSpecificSchedule),
        headers: newHeader
      }
    )
    if (!response.ok) throw new Error("Something went wrong")
  } catch (error) {
    console.error(error)
  }
}
