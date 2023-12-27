import type { EmployeesWithId } from "@/types/withId"
import { EMPLOYEE_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchSearch = async (): Promise<EmployeesWithId[]> => {
  // endpoint:
  // - lieu(x,y?)
  // - services name
  // - firstname and lastname employees
  // - date available employees
  const employeesResponse = await fetch(
    `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )

  if (!employeesResponse.ok)
    throw new Error("Something went wrong")

  const employees = await employeesResponse.json()

  return employees
}
