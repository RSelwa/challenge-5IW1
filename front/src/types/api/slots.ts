export type Slots = {
  service: string
  user: string
  startTime: any //timestamp
  duration: string
  status: SlotsStatus
}
export type SlotsStatus = "reserved" | "canceled" | "passed"

export type SemaineType = {
  employee: string
  day: number // number of day of the week
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
  startTimeMorning: number // heure
  endTimeMorning: number // heure
  startTimeAfternoon: number // heure
  endTimeAfternoon: number // heure
}

export type PlanningWeekDay = { date: Date; reservations: Slots[] }
