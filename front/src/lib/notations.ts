import type { NotationType } from "@/types/api/notation"
import type { NotationtionsWithId } from "@/types/withId"
import { NOTATION_API_ROUTES } from "@/constants/db"
import { formDataHeader, requestOptions } from "@/utils/db"
import { mockNotation } from "@/mock/notationMock"

export const fetchNotations = async (): Promise<NotationtionsWithId[]> => {
  // const response = await fetch(
  //   `${import.meta.env.VITE_API_URL}${NOTATION_API_ROUTES}`,
  //   requestOptions({ method: "GET" })
  // )

  // if (!response.ok) throw new Error("Something went wrong")

  // const organizations: NotationtionsWithId[] = await response.json()
  await new Promise((r) => setTimeout(r, 2000))
  const notations: NotationtionsWithId[] = mockNotation

  return notations
}
export const fetchNotation = async (
  id: string
): Promise<NotationtionsWithId> => {
  // const response = await fetch(
  //   `${import.meta.env.VITE_API_URL}${NOTATION_API_ROUTES}/${id}`,
  //   requestOptions({ method: "GET" })
  // )
  // if (!response.ok) throw new Error("Something went wrong")

  // const notation: NotationtionsWithId = await response.json()
  await new Promise((r) => setTimeout(r, 2000))
  const notation: NotationtionsWithId = mockNotation[0]
  return notation
}
export const postNotation = async (notation: NotationType) => {
  const { headers, formData } = formDataHeader(notation)

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
