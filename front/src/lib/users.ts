import type { UsersWithId } from "@/types/withId"
import { USER_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchUsers = async (): Promise<UsersWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${USER_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const users: UsersWithId[] = await response.json()
  return users
}
export const fetchUser = async (id: string): Promise<UsersWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${USER_API_ROUTES}/${id}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const user: UsersWithId = await response.json()
  return user
}
