import type { NotationType } from "@/types/api/notation"
import type { NotationtionsWithId } from "@/types/withId"
import { NOTATION_API_ROUTES } from "@/constants/db"
import { formDataHeader, requestOptions } from "@/utils/db"

export const fetchNotations = async (): Promise<NotationtionsWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${NOTATION_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organizations: NotationtionsWithId[] = await response.json()
  return organizations
}

export const postNotation = async (notation: NotationType) => {
  console.log(notation)

  const { headers, formData } = formDataHeader(notation)
  console.log(formData)

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${NOTATION_API_ROUTES}`,
    requestOptions({
      method: "POST",
      headers,
      body: formData
    })
  )
  if (!response.ok) throw new Error("Something went wrong")
}
export const patchNotation = async (notation: NotationtionsWithId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${NOTATION_API_ROUTES}/${notation.id}`,
    requestOptions({ method: "PATCH", body: JSON.stringify(notation) })
  )
  if (!response.ok) throw new Error("Something went wrong")
}
