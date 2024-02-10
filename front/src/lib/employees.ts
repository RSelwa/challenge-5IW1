import type { EmployeePost } from "@/types/api/employees"
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

export const postEmployee = async (employee: EmployeePost) => {
  const newHeader = new Headers()
  newHeader.append("Content-Type", "application/json")
  newHeader.append(
    "Authorization",
    `Bearer ${localStorage.getItem("token")?.replaceAll('"', "") || ""}`
  )
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}`,
    {
      method: "POST",
      body: JSON.stringify(employee),
      headers: newHeader
    }
  )
  if (!response.ok) throw new Error("Something went wrong")
}
