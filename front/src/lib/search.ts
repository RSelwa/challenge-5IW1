import type { EmployeesWithId, EstablishmentsWithId } from "@/types/withId"
import { EMPLOYEE_API_ROUTES, ESTABLISHMENT_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export type SearchResponse = (EmployeesWithId | EstablishmentsWithId)[]

export const fetchSearch = async (): Promise<SearchResponse> => {
  const [employeesResponse, establishementResponse] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}`,
      requestOptions({ method: "GET" })
    ),
    fetch(
      `${import.meta.env.VITE_API_URL}${ESTABLISHMENT_API_ROUTES}`,
      requestOptions({ method: "GET" })
    )
  ])
  if (!employeesResponse.ok || !establishementResponse.ok)
    throw new Error("Something went wrong")

  const [employees, establishement] = await Promise.all([
    employeesResponse.json(),
    establishementResponse.json()
  ])

  return [...employees, ...establishement]
}
