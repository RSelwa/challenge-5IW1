import { NOTATION_API_ROUTES } from "@/constants/db"
import { NotationPost, NoteSomone } from "@/types/api/notation"
import { NotationtionsWithId } from "@/types/withId"
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

    
export const postNotation = async (notation: NotationPost) => {
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

  
export const noteSomone = async (notation: NoteSomone) => {
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