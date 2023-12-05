import type { LoginFormData, SigninUserFormData } from "@/types/formData"
import { USER_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"
import { removeLocalStorage, setLocalStorage } from "@/utils/localStorage"

export const loginUser = async (data: LoginFormData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth`,
    requestOptions({ method: "POST", data: data })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const { token } = await response.json()
  setLocalStorage("token", token)
}

export const signInUser = async (data: SigninUserFormData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${USER_API_ROUTES}`,
    requestOptions({ method: "POST", data: data })
  )
  if (!response.ok) throw new Error("Something went wrong")
  await loginUser({ email: data.email, password: data.plainPassword })
}

export const logout = () => {
  removeLocalStorage("token")
}
