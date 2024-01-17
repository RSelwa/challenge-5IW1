import type { HoraireType } from "@/types/api/slots"
import { dayInSeconds, daysInWeek, weekInSeconds } from "@/constants/date"

export const convertMinutesToMilliseconds = (minute: number) => {
  return minute * 60 * 1000
}

export const convertDaysToMilliseconds = (days: number) => {
  return days * 24 * 60 * 60 * 1000
}

export const getDateFromTimestamp = (timestamp: number): Date => {
  return new Date(timestamp)
}

export const weekCount = (
  year: number,
  month_number: number,
  startDayOfWeek: number
) => {
  // month_number is in the range 1..12

  // Get the first day of week week day (0: Sunday, 1: Monday, ...)
  const firstDayOfWeek = startDayOfWeek || 0

  const firstOfMonth = new Date(year, month_number - 1, 1)
  const lastOfMonth = new Date(year, month_number, 0)
  const numberOfDaysInMonth = lastOfMonth.getDate()
  const firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7

  const used = firstWeekDay + numberOfDaysInMonth

  return Math.ceil(used / 7)
}
export const getMonday = (date: Date) => {
  const day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 1) // adjust when day is sunday
  return new Date(date.setDate(diff))
}
export const getDateFromWeek = (date: Date) => {
  const firstday = getInitialDay(getMonday(date))
  const lastday = getInitialDay(
    new Date(firstday.getTime() + (weekInSeconds - dayInSeconds) * 1000)
  )

  return { firstday, lastday }
}

export const differenceDaysBetweenTwoDates = (date1: Date, date2: Date) => {
  const Difference_In_Time = date2.getTime() - date1.getTime()
  // To calculate the no. of days between two dates
  return Difference_In_Time / (dayInSeconds * 1000) + 1
}

export const getInitialDay = (date: Date): Date => {
  return new Date(date.setUTCHours(0, 0, 0, 0))
}
export const dateToString = (date: Date) => {
  // 01 Jan
  const list = date.toUTCString().split(" ")
  return list[1] + " " + list[2]
}

export const dayOfWeek = (date: Date, short?: boolean) => {
  return short
    ? daysInWeek[date.getDay()].substring(0, 3)
    : daysInWeek[date.getDay()]
}
const checkTime = (i: number) => {
  let s = i.toString()
  if (i < 10) {
    s = "0" + i
  }
  return s
}
export const getHoursMinutes = (date: Date): string => {
  const h = date.getHours()
  const m = date.getMinutes()
  // add a zero in front of numbers<10
  const min = checkTime(m)
  const hour = checkTime(h)
  return `${hour}:${min}`
}

// Tell if second day is in first day
export const isInSameDay = (
  premiereDate: Date,
  deuxiemeDate: Date
): boolean => {
  // Définir la première date à 0h
  const debutJournee = new Date(premiereDate)
  debutJournee.setHours(0, 0, 0, 0)

  // Définir la première date du jour suivant à 29h59
  const finJourSuivant = new Date(premiereDate)
  finJourSuivant.setHours(29, 59)
  finJourSuivant.setDate(finJourSuivant.getDate())

  // Vérifier si la deuxième date est comprise dans la plage
  return deuxiemeDate >= debutJournee && deuxiemeDate <= finJourSuivant
}

export const isInPlageHoraire = (
  date: Date,
  horaireDay: HoraireType
): boolean => {
  const hour = date.getHours()

  return (
    (hour > horaireDay.startTimeMatinée && hour < horaireDay.endTimeMatinée) ||
    (hour > horaireDay.startTimeAprem && hour < horaireDay.endTimeAprem)
  )
}
