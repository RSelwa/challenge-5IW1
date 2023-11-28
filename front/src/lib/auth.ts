import { LoginFormData } from "@/types/formData"

export const loginUser = async (data: LoginFormData) => {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth`,
    requestOptions
  )
  if (!response.ok) throw new Error("Something went wrong")

  const responseData = await response.json()
  console.log(responseData)
}
