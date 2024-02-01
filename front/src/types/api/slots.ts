export type Slots = {
  serviceId: string
  userId: string
  startTime: string //timestamp
  duration: number
  status: SlotsStatus
}
export type SlotsStatus = "reserved" | "canceled"
export type SemaineType = {
  employeeId: string
  dayOfWeek: number // number of day of the week
} & HoraireType

export type HoraireType = {
  startTimeMatinée: number // heure
  endTimeMatinée: number // heure
  startTimeAprem: number // heure
  endTimeAprem: number // heure
}

export type PlanningWeekDay = { date: Date; reservations: Slots[] }
