import type { EmployeesWithId } from "@/types/withId"
import { EMPLOYEE_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"
import { isPlaceInRadius } from "@/utils/maps"
import type { SearchQuery } from "@/types"
import { areStringEqual } from "@/utils"

export const fetchSearch = async (
  searchQuery: SearchQuery
): Promise<EmployeesWithId[]> => {
  try {
    const employeesResponse = await fetch(
      `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}`,
      requestOptions({ method: "GET" })
    )

    if (!employeesResponse.ok) throw new Error("Something went wrong")

    const employees = await employeesResponse.json()
    // Filter employees by
    return filterEmployeesBySearchQuery(searchQuery, employees)
  } catch (error) {
    console.error(error)
    return []
  }
}

const filterEmployeesBySearchQuery = (
  searchQuery: SearchQuery,
  employees: EmployeesWithId[]
): EmployeesWithId[] => {
  // Filter employees by SearchQuery

  return employees.filter((employee) => {
    const isEmployeeSpecialisationMatch = areStringEqual(
      searchQuery.service,
      employee.category
    )

    const isEmployeeInRadius = isPlaceInRadius(
      searchQuery.localisation.geometry,
      searchQuery.radiusInKm,
      {
        lat: employee.establishment.lat,
        lng: employee.establishment.lng
      }
    )
    return isEmployeeInRadius && isEmployeeSpecialisationMatch
  })
}
