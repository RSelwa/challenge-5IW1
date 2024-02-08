import type { AdminWithId } from "@/types/withId"
import { ADMIN_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchAdmins = async (): Promise<AdminWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${ADMIN_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const admins: AdminWithId[] = await response.json()
  return admins
}
