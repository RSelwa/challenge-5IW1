import type { EmployeesWithId } from "@/types/withId"
import { EMPLOYEE_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchEmployees = async (): Promise<EmployeesWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const employees: EmployeesWithId[] = await response.json()
  return employees
}
export const fetchEmployee = async (id: string): Promise<EmployeesWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}/${id}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: EmployeesWithId = await response.json()
  return organization
}

export const editEmployee = async (employee: EmployeesWithId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}/${employee.id}`,
      requestOptions({ method: "PATCH", body: JSON.stringify(employee) })
    )
    if (!response.ok) throw new Error("Something went wrong")

    const employees = await response.json()
    return employees
  } catch (error) {
    console.error(error)
  }
}
