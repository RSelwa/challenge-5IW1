import type { DataKeyLink } from "@/types/admin"

const ID_EXCEPTION = ["id"]
export const USER_KEY_EXCEPTION = [...ID_EXCEPTION, "slots"]
export const EMPLOYEE_KEY_EXCEPTION = [...ID_EXCEPTION]
export const EMPLOYEE_SPECIFIC_SCHEDULE_KEY_EXCEPTION = [...ID_EXCEPTION]
export const ORGANIZATION_KEY_EXCEPTION = [...ID_EXCEPTION, "kbis"]
export const SERVICE_KEY_EXCEPTION = [...ID_EXCEPTION]
export const ESTABLISHMENT_KEY_EXCEPTION = [...ID_EXCEPTION]
export const SLOT_KEY_EXCEPTION = [...ID_EXCEPTION]

export const DEFAULT_KEY_EXCEPTION = [...ID_EXCEPTION]

export const ORGANIZATION_KEY_LINK_EDIT: DataKeyLink = [
  { name: "establishments", type: "array", displayName: "name" }
]
export const ESTABLISHMENT_KEY_LINK_EDIT: DataKeyLink = [
  { name: "employees", type: "array", displayName: "firstname" }
]
export const EMPLOYEE_KEY_LINK_EDIT: DataKeyLink = [
  { name: "establishment", type: "object", displayName: "name" },
  { name: "slots", type: "array", displayName: "name" },
  { name: "employeeSpecificSchedules", type: "array", displayName: "name" },
  { name: "service", type: "object", displayName: "name" }
]
