import { Fragment, useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { dayInSeconds, weekInSeconds } from "@/constants/date"
import {
  dateToString,
  dayOfWeek,
  differenceDaysBetweenTwoDates,
  getDateFromWeek,
  getInitialDay
} from "@/utils/date"
import { cn } from "@/utils"

const Planning = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [weekDays, setWeekDays] = useState<Date[]>([])
  const scaleButton = 24
  const changeWeek = (nextWeek: boolean) =>
    setCurrentDate(
      (prevSate) =>
        new Date(
          prevSate.getTime() +
            (nextWeek ? weekInSeconds : -weekInSeconds) * 1000
        )
    )

  const loadDatesWeek = () => {
    setWeekDays([])
    const { firstday, lastday } = getDateFromWeek(currentDate)
    const diff = differenceDaysBetweenTwoDates(firstday, lastday)

    for (let index = 0; index < diff; index++)
      setWeekDays((prevState) => [
        ...prevState,
        getInitialDay(
          new Date(firstday.getTime() + index * dayInSeconds * 1000)
        )
      ])
  }
  const cantChangePreviousWeek = (): boolean => {
    const currentTime = new Date().getTime()
    const begginingOfTheWeek = currentDate.getTime()
    const endOfTheWeek = currentDate.getTime() + weekInSeconds * 1000

    if (begginingOfTheWeek < currentTime && currentTime < endOfTheWeek)
      return true
    return false
  }
  useEffect(() => {
    loadDatesWeek()
  }, [currentDate])

  return (
    <Fragment>
      <div>{currentDate.toUTCString()}</div>
      <div className="flex w-fit gap-4 rounded bg-cyan-50 p-2">
        <Button
          variant="ghost"
          onClick={() => changeWeek(false)}
          disabled={cantChangePreviousWeek()}
          className={cn(
            cantChangePreviousWeek() ? "text-gray-500" : "text-cyan-500"
          )}
        >
          <ChevronLeftIcon height={scaleButton} width={scaleButton} />
        </Button>
        <div className="flex gap-2">
          {weekDays.map((e, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded bg-cyan-100 p-4"
            >
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">{dayOfWeek(e, true)}</span>
                <span>{dateToString(e)}</span>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          onClick={() => changeWeek(true)}
          className={cn("text-cyan-500")}
        >
          <ChevronRightIcon height={scaleButton} width={scaleButton} />
        </Button>
      </div>
    </Fragment>
  )
}

export default Planning
