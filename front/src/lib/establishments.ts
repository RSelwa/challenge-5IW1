import type { EstablishmentsWithId } from "@/types/withId"
import { ESTABLISHMENT_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchEstablishments = async (): Promise<
  EstablishmentsWithId[]
> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${ESTABLISHMENT_API_ROUTES}`,
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
    `${import.meta.env.VITE_API_URL}${ESTABLISHMENT_API_ROUTES}/${id}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: EstablishmentsWithId = await response.json()
  return organization
}
