export type Slots = {
  service: string
  user: string
  startTime: string //timestamp
  duration: string
  status: SlotsStatus
}
export type SlotsStatus = "reserved" | "canceled" | "passed"

export type SemaineType = {
  employeeId: string
  dayOfWeek: number // number of day of the week
} & HoraireType

export type ServiceSlot = {
  employee: string
  slots: {
    service: string
    user: string
    startTime: string //timestamp
    duration: string
    status: SlotsStatus
  }[]
  startTime: string
  status: SlotsStatus
  user: string
}
export type HoraireType = {
  startTimeMatinée: number // heure
  endTimeMatinée: number // heure
  startTimeAprem: number // heure
  endTimeAprem: number // heure
}

export type PlanningWeekDay = { date: Date; reservations: Slots[] }
