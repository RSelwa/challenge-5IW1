import type { OrganizationsWithId } from "@/types/withId"
import { requestOptions } from "@/utils/db"

export const fetchOrganizations = async (): Promise<OrganizationsWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/organizations`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organizations: OrganizationsWithId[] = await response.json()
  return organizations
}
export const fetchOrganization = async (
  id: string
): Promise<OrganizationsWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/organizations/${id}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const organization: OrganizationsWithId = await response.json()
  return organization
}
