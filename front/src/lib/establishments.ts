import type { EstablishmentsWithId } from "@/types/withId"
import { ESTABLISHMENT_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchEstablishments = async (): Promise<
  EstablishmentsWithId[]
> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${ESTABLISHMENT_API_ROUTES}`,
    requestOptions({ method: "GET" })
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
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: EstablishmentsWithId = await response.json()
  return organization
}
export const editEstablishment = async (
  establishment: EstablishmentsWithId
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${ESTABLISHMENT_API_ROUTES}/${
        establishment.id
      }`,
      requestOptions({ method: "PATCH", body: JSON.stringify(establishment) })
    )
    if (!response.ok) throw new Error("Something went wrong")
  } catch (error) {
    console.error(error)
  }
}
