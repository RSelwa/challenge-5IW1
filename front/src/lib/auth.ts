import type { LoginFormData, SigninUserFormData } from "@/types/formData"
import { requestOptions } from "@/utils/db"
import { removeLocalStorage, setLocalStorage } from "@/utils/localStorage"

export const loginUser = async (data: LoginFormData) => {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth`,
    requestOptions({ method: "POST", data: data })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const { token } = await response.json()
  setLocalStorage("token", token)
}

export const signInUser = async (data: SigninUserFormData) => {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users`,
    requestOptions({ method: "POST", data: JSON.stringify(data) })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const responseData = await response.json()
  console.log(responseData)
}

export const logout = () => {
  removeLocalStorage("token")
}
