import type { OrganizationWithId } from "@/types/withId"

export const organizationMock: OrganizationWithId = {
  id: "organizationId",
  clinicIds: ["clinicId"],
  kbis: "kbis",
  manager: {
    email: "manager@yopmail.com"
  }
}
