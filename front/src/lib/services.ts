import { PostService } from "@/types/api/services"
import type { ServicesWithId } from "@/types/withId"
import { SERVICE_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchServices = async (): Promise<ServicesWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${SERVICE_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const services: ServicesWithId[] = await response.json()
  return services
}
export const fetchServicesByEmployeeId = async (
  employeeId: string
): Promise<ServicesWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${SERVICE_API_ROUTES}?employee_id=${employeeId}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const services: ServicesWithId[] = await response.json()
  return services
}

export const fetchService = async (id: string): Promise<ServicesWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${SERVICE_API_ROUTES}/${id}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const service: ServicesWithId = await response.json()
  return service
}
export const editService = async (service: Partial<ServicesWithId>) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${SERVICE_API_ROUTES}/${service.id}`,
      requestOptions({ method: "PATCH", body: JSON.stringify(service) })
    )
    if (!response.ok) throw new Error("Something went wrong")
  } catch (error) {
    console.error(error)
  }
}
export const postService = async (service: PostService) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${SERVICE_API_ROUTES}`,

      {
        method: "POST",
        body: JSON.stringify(service),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    )
    if (!response.ok) throw new Error("Something went wrong")
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
