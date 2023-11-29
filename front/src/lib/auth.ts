import type { LoginFormData, SigninUserFormData } from "@/types/formData"
import { removeLocalStorage, setLocalStorage } from "@/utils/localStorage"

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

  const { token } = await response.json()
  setLocalStorage("token", token)
}

export const signInUser = async (data: SigninUserFormData) => {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users`,
    requestOptions
  )
  if (!response.ok) throw new Error("Something went wrong")

  const responseData = await response.json()
  console.log(responseData)
}

export const logout = () => {
  removeLocalStorage("token")
}
