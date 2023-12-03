import type { ServicesWithId } from "@/types/withId"
import { SERVICE_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchServices = async (): Promise<ServicesWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${SERVICE_API_ROUTES}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const services: ServicesWithId[] = await response.json()
  return services
}
export const fetchService = async (id: string): Promise<ServicesWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${SERVICE_API_ROUTES}/${id}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const service: ServicesWithId = await response.json()
  return service
}
