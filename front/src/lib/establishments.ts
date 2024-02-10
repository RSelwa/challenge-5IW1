import type { Establishments } from "@/types/api/establishment"
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

export const postEstablisment = async (
  establishment: Omit<Establishments, "employees">
) => {
  const newHeader = new Headers()
  newHeader.append("Content-Type", "application/json")
  newHeader.append(
    "Authorization",
    `Bearer ${localStorage.getItem("token")?.replaceAll('"', "") || ""}`
  )
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${ESTABLISHMENT_API_ROUTES}`,
    {
      method: "POST",
      body: JSON.stringify(establishment),
      headers: newHeader
    }
  )
  if (!response.ok) throw new Error("Something went wrong")
  // const orga = await response.json()
}
