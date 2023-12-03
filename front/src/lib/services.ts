import type { ServicesWithId } from "@/types/withId"
import { requestOptions } from "@/utils/db"

export const fetchServices = async (): Promise<ServicesWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/services`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const services: ServicesWithId[] = await response.json()
  return services
}
export const fetchService = async (id: string): Promise<ServicesWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/services/${id}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const service: ServicesWithId = await response.json()
  return service
}
