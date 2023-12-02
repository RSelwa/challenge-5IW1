import type { UsersWithId } from "@/types/withId"
import { requestOptions } from "@/utils/db"

export const fetchUsers = async (): Promise<UsersWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const users: UsersWithId[] = await response.json()
  return users
}
