import type { OrganizationsWithId } from "@/types/withId"
import { ORGANIZATION_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchOrganizations = async (): Promise<OrganizationsWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${ORGANIZATION_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organizations: OrganizationsWithId[] = await response.json()
  return organizations
}
export const fetchOrganization = async (
  id: string
): Promise<OrganizationsWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${ORGANIZATION_API_ROUTES}/${id}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: OrganizationsWithId = await response.json()
  return organization
}
