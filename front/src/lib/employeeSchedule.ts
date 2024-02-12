import type { SemaineType } from "@/types/api/slots"
import type { SemaineTypeWithId } from "@/types/withId"
import { EMPLOYEEWEEKSCHEDULE_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchEmployeeWeekSchedules = async (): Promise<
  SemaineTypeWithId[]
> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEEWEEKSCHEDULE_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const employeeWeekSchedules: SemaineTypeWithId[] = await response.json()
  return employeeWeekSchedules
}
export const fetchEmployeeWeekSchedule = async (
  id: string
): Promise<SemaineTypeWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEEWEEKSCHEDULE_API_ROUTES}/${id}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const employeeWeekSchedule: SemaineTypeWithId = await response.json()
  return employeeWeekSchedule
}
export const editEmployeeWeekSchedule = async (
  employeeWeekSchedule: SemaineTypeWithId
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${EMPLOYEEWEEKSCHEDULE_API_ROUTES}/${
        employeeWeekSchedule.id
      }`,
      requestOptions({
        method: "PATCH",
        body: JSON.stringify(employeeWeekSchedule)
      })
    )
    if (!response.ok) throw new Error("Something went wrong")
  } catch (error) {
    console.error(error)
  }
}
export const postEmployeeWeekSchedule = async (
  employeeWeekSchedule: SemaineType
) => {
  const newHeader = new Headers()
  newHeader.append("Content-Type", "application/json")
  newHeader.append(
    "Authorization",
    `Bearer ${localStorage.getItem("token")?.replaceAll('"', "") || ""}`
  )
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEEWEEKSCHEDULE_API_ROUTES}`,

    {
      method: "POST",
      body: JSON.stringify(employeeWeekSchedule),
      headers: newHeader
    }
  )
  if (!response.ok) throw new Error("Something went wrong")
}
