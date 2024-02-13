import type { EmailType } from "@/types/mail"
import { EMAIL_API_ROUTES } from "@/constants/db"

export const postEmail = async (email: EmailType) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${EMAIL_API_ROUTES}`,
    {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }
  )
  if (!response.ok) throw new Error("Something went wrong")
}
