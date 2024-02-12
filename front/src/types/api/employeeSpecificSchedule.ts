export type EmployeeSpecificSchedules = {
  employee: string
  type: TypeSpecificScheduleEmployee
  date: string
  status: StatusSpecificSchedule
}
export type StatusSpecificSchedule = "PENDING" | "ACCEPTED" | "REFUSED"
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
  status?: StatusSpecificSchedule
}
export type PostSpecificSchedule = {
  employee: string
  type: TypeSpecificScheduleEmployee
  date: Date
  status?: StatusSpecificSchedule
}
