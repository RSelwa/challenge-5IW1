const ID_EXCEPTION = ["id"]
export const USER_KEY_EXCEPTION = [...ID_EXCEPTION, "slots"]
export const EMPLOYEE_KEY_EXCEPTION = [...ID_EXCEPTION]
export const EMPLOYEE_SPECIFIC_SCHEDULE_KEY_EXCEPTION = [...ID_EXCEPTION]
export const ORGANIZATION_KEY_EXCEPTION = [...ID_EXCEPTION, "kbis"]
export const SERVICE_KEY_EXCEPTION = [...ID_EXCEPTION]
export const ESTABLISHMENT_KEY_EXCEPTION = [...ID_EXCEPTION]
export const SLOT_KEY_EXCEPTION = [...ID_EXCEPTION]

export const DEFAULT_KEY_EXCEPTION = [...ID_EXCEPTION]

export const ORGANIZATION_KEY_LINK_EDIT = ["establishments"]
export const ESTABLISHMENT_KEY_LINK_EDIT = ["employees"]
export const EMPLOYEE_KEY_LINK_EDIT = [
  "establishment",
  "slots",
  "employeeSpecificSchedules",
  "service"
]
