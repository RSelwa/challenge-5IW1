import { describe, expect, test } from "@jest/globals"
import type { HoraireType } from "@/types/api/slots"
import {
  convertDaysToMilliseconds,
  convertMinutesToMilliseconds,
  countRepetitions,
  dayOfWeek,
  differenceDaysBetweenTwoDates,
  getDateFromTimestamp,
  getDateFromWeek,
  getHoursMinutes,
  getMonday,
  getSlotsDatesFromRange,
  isInPlageHoraire,
  isInSameDay
} from "@/utils/date"

describe("test date's functions", () => {
  test("Convert Minutes to Ms", () => {
    expect(convertMinutesToMilliseconds(1)).toBe(60000)
  })

  test("Convert Days to Ms", () => {
    expect(convertDaysToMilliseconds(1)).toBe(86400000)
  })
  test("Date to Timestamp", () => {
    expect(getDateFromTimestamp(1705859359).getTime()).toBe(
      new Date(1705859359).getTime()
    )
  })
  test("Get monday", () => {
    const previousMonday = new Date(1705340959000).getTime()
    expect(getMonday(new Date(1705859359000)).getTime()).toBe(previousMonday)
  })
  test.skip("Get Dates From week", () => {
    const firstday = new Date("2024-01-15T00:00:00.000Z")
    const lastday = new Date("2024-01-21T00:00:00.000Z")
    expect(getDateFromWeek(new Date(1705859359000))).toBe({
      firstday: firstday.toUTCString(),
      lastday: lastday.toUTCString()
    })
  })
  test("Differences days between two dates ", () => {
    const firstday = new Date(1705686559000) // 19 /01
    const lastday = new Date(1705945759000) // 22 /01
    expect(differenceDaysBetweenTwoDates(firstday, lastday)).toBe(4)
  })
  test("Day of the week ", () => {
    const firstday = new Date(1705686559000) // 19 /01
    expect(dayOfWeek(firstday)).toBe("Vendredi")
  })
  test("Day of the week v2", () => {
    const firstday = new Date(1710885739000) // 15/03
    expect(dayOfWeek(firstday)).toBe("Mardi")
  })
  test("Get time string ", () => {
    const firstday = new Date(1705686559000) // 19 /01
    expect(getHoursMinutes(firstday)).toBe("17:49")
  })
  test("Get time string v2", () => {
    const firstday = new Date(1705356139000) // 19 /01
    expect(getHoursMinutes(firstday)).toBe("22:02")
  })
  test("Two dates the same Day", () => {
    const firstday = new Date(1705686559000) // 19 /01
    const lastDay = new Date(1706032159000) // 25 /01
    expect(isInSameDay(firstday, lastDay)).toBe(false)
  })
  test("Two dates the same Day v2", () => {
    const firstday = new Date(1705686559000) // 19 /01
    const lastDay = new Date(1705690159000) // 19 /01
    expect(isInSameDay(firstday, lastDay)).toBe(true)
  })
  test("Date in during time slots ", () => {
    const firstday = new Date(1710860539000) // 19 /03 16:02
    const plageHoraires: HoraireType = {
      endTimeAfternoon: 18,
      endTimeMorning: 12,
      startTimeAfternoon: 14,
      startTimeMorning: 8
    }
    expect(isInPlageHoraire(firstday, plageHoraires)).toBe(true)
  })
  test("Date in during time slots v2", () => {
    const firstday = new Date(1710885739000) // 19 /03 23:02
    const plageHoraires: HoraireType = {
      endTimeAfternoon: 18,
      endTimeMorning: 12,
      startTimeAfternoon: 14,
      startTimeMorning: 8
    }
    expect(isInPlageHoraire(firstday, plageHoraires)).toBe(false)
  })
  test("Date in during time slots v3", () => {
    const firstday = new Date(1710835339000) // 19 /03 08:02
    const plageHoraires: HoraireType = {
      endTimeAfternoon: 18,
      endTimeMorning: 12,
      startTimeAfternoon: 14,
      startTimeMorning: 12
    }
    expect(isInPlageHoraire(firstday, plageHoraires)).toBe(false)
  })
  test("Count repetitions between intervals", () => {
    expect(countRepetitions(1, 2, 4)).toBe(2)
  })
  test("Count repetitions between intervals v2", () => {
    expect(countRepetitions(2, 2, 4)).toBe(1)
  })
  test("Count repetitions between intervals v3", () => {
    expect(countRepetitions(5, 0, 25)).toBe(5)
  })
  test.skip("Get slots available from dates", () => {
    const firstday = new Date(1710835339000) //19/03
    expect(getSlotsDatesFromRange(8, 5, firstday)).toBe(5)
  })
})
