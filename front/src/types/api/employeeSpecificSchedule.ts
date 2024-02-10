export type EmployeeSpecificSchedules = {
  employee: string
  type: TypeSpecificScheduleEmployee
  date: string
}
export type TypeSpecificScheduleEmployee =
  | "conges"
  | "maladie"
  | "formation"
  | "autre"

export type SpecificScheduleForm = {
  employee: string
  type: TypeSpecificScheduleEmployee
  date: string
  endDate: string
  isOnlyOneDay: boolean
}
export type PostSpecificSchedule = {
  employee: string
  type: TypeSpecificScheduleEmployee
  date: Date
}
