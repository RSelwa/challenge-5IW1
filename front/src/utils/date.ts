import type { HoraireType, SemaineType, Slots } from "@/types/api/slots"
import { dayInSeconds, daysInWeek, weekInSeconds } from "@/constants/date"
import { defaultHoraireType } from "@/constants"

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
    (hour > horaireDay.startTimeMorning && hour < horaireDay.endTimeMorning) ||
    (hour > horaireDay.startTimeAfternoon && hour < horaireDay.endTimeAfternoon)
  )
}

export const countRepetitions = (
  firstNumber: number,
  startInterval: number,
  endInterval: number
): number => {
  if (firstNumber <= 0 || startInterval >= endInterval) {
    // Cas invalides
    return 0
  }

  const intervalLength = endInterval - startInterval
  const repetitions = Math.floor(intervalLength / firstNumber)

  return repetitions
}

export const getSlotsDatesFromRange = (
  departHour: number,
  numberOfSlots: number,
  day: Date
): Date[] => {
  const slots: Date[] = []

  if (departHour < 0 || departHour > 23 || numberOfSlots <= 0) {
    // Vérification des paramètres invalides
    return slots
  }

  const startOfDay = new Date(day)
  startOfDay.setHours(0, 0, 0, 0)

  for (let i = 0; i < numberOfSlots; i++) {
    const slotDate = new Date(startOfDay)
    slotDate.setHours(departHour + i)
    slots.push(slotDate)
  }

  return slots
}

export const getSlotsByHoraireDay = (
  day: Date,
  horaireOfDay: HoraireType,
  duration: number
): Date[] => {
  const availableMatin = countRepetitions(
    duration,
    horaireOfDay.startTimeMorning,
    horaireOfDay.endTimeMorning
  )
  const availableAprem = countRepetitions(
    duration,
    horaireOfDay.startTimeAfternoon,
    horaireOfDay.endTimeAfternoon
  )

  const slotsMatin = getSlotsDatesFromRange(
    horaireOfDay.startTimeMorning,
    availableMatin,
    day
  )
  const slotsAprem = getSlotsDatesFromRange(
    horaireOfDay.startTimeAfternoon,
    availableAprem,
    day
  )

  return [...slotsMatin, ...slotsAprem]
}

export const excludeReservedSlots = (
  availableSlots: Date[],
  reservations: Slots[],
  durationOfSlot: number
): Date[] => {
  console.log(availableSlots)

  return availableSlots.filter((slot) => {
    const endOfCurrentSlot = slot.getTime() + durationOfSlot * 3600000 // duration hour in seconds

    const isSlotsOccpedByReservation = reservations.some((reservation) => {
      const endOfReservation: number =
        new Date(reservation.startTime).getTime() +
        parseInt(reservation.duration) * 3600000 // duration hour in seconds

      const reservationStartDuringSlot =
        slot.getTime() <= new Date(reservation.startTime).getTime() &&
        new Date(reservation.startTime).getTime() <= endOfCurrentSlot

      const reservationCoverSlot =
        new Date(reservation.startTime).getTime() < slot.getTime() &&
        endOfReservation > endOfCurrentSlot

      const reservationEndDuringSlot =
        slot.getTime() <= endOfReservation &&
        endOfReservation <= endOfCurrentSlot

      return (
        reservationStartDuringSlot ||
        reservationEndDuringSlot ||
        reservationCoverSlot
      )
    })
    // console.log(isSlotsOccpedByReservation, slot)

    return !isSlotsOccpedByReservation
  })
}

export const getAvailableReservation = ({
  day,
  semaineTypeUser,
  reservations,
  duration
}: {
  day: Date
  semaineTypeUser?: SemaineType[]
  reservations: Slots[]
  duration: number
}): Date[] => {
  const dayOfTheWeek = day.getDay()
  const horaireOfDay: HoraireType =
    semaineTypeUser?.find((dayType) => dayType.day === dayOfTheWeek) ||
    defaultHoraireType
  console.log(horaireOfDay)

  const reservationsDuringTheDay = reservations.filter((reservation) =>
    isInPlageHoraire(new Date(reservation.startTime), defaultHoraireType)
  )

  const availableReservations: Date[] = getSlotsByHoraireDay(
    day,
    horaireOfDay,
    duration
  )
  return excludeReservedSlots(
    availableReservations,
    reservationsDuringTheDay,
    duration
  )
}

export const toIsoString = (date: Date): string => {
  const tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num: number) {
      return (num < 10 ? "0" : "") + num
    }

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ":" +
    pad(Math.abs(tzo) % 60)
  )
}
