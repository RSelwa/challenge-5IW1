import type { EmployeesWithId, EstablishmentsWithId } from "@/types/withId"
import { EMPLOYEE_API_ROUTES, ESTABLISHMENT_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export type SearchResponse = (EmployeesWithId | EstablishmentsWithId)[]

export const fetchSearch = async (): Promise<SearchResponse> => {
  // endpoint:
  // - lieu(x,y?)
  // - services name
  // - firstname and lastname employees
  // - date available employees
  const [employeesResponse, establishmentResponse] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}`,
      requestOptions({ method: "GET" })
    ),
    fetch(
      `${import.meta.env.VITE_API_URL}${ESTABLISHMENT_API_ROUTES}`,
      requestOptions({ method: "GET" })
    )
  ])
  if (!employeesResponse.ok || !establishmentResponse.ok)
    throw new Error("Something went wrong")

  const [employees, establishment] = await Promise.all([
    employeesResponse.json(),
    establishmentResponse.json()
  ])

  return [...employees, ...establishment]
}
