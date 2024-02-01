import type { EmployeesWithId } from "@/types/withId"
import type { EmployeePost } from "@/types/api/employees"

import { EMPLOYEE_API_ROUTES } from "@/constants/db"
import { formDataHeader, requestOptions } from "@/utils/db"

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
  const { headers, formData } = formDataHeader(employee)

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}`,
    requestOptions({
      method: "POST",
      headers,
      body: formData
    })
  )
  if (!response.ok) throw new Error("Something went wrong")
  
}
