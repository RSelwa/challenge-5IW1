import type { EstablishmentsWithId } from "@/types/withId"
import { requestOptions } from "@/utils/db"

export const fetchEstablishments = async (): Promise<
  EstablishmentsWithId[]
> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/establishments`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const establishments: EstablishmentsWithId[] = await response.json()
  return establishments
}
export const fetchEstablishment = async (
  id: string
): Promise<EstablishmentsWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/establishments/${id}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: EstablishmentsWithId = await response.json()
  return organization
}
