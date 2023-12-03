import type { EmployeesWithId } from "@/types/withId"
import { requestOptions } from "@/utils/db"

export const fetchEmployees = async (): Promise<EmployeesWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/employees`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const employees: EmployeesWithId[] = await response.json()
  return employees
}
export const fetchEmployee = async (id: string): Promise<EmployeesWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/employees/${id}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: EmployeesWithId = await response.json()
  return organization
}
