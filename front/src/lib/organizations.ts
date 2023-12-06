import type { OrganizationPost } from "@/types/api/organization"
import type { OrganizationsWithId } from "@/types/withId"
import { ORGANIZATION_API_ROUTES } from "@/constants/db"
import { formDataHeader, requestOptions } from "@/utils/db"

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

export const postOrganization = async (organization: OrganizationPost) => {
  const { headers, formData } = formDataHeader(organization)

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${ORGANIZATION_API_ROUTES}`,
    requestOptions({
      method: "POST",
      headers,
      body: formData
    })
  )
  if (!response.ok) throw new Error("Something went wrong")
  // const orga = await response.json()
}
