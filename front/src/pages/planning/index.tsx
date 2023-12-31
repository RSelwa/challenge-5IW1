import { useEffect, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { dayInSeconds, weekInSeconds } from "@/constants/date"
import {
  dateToString,
  dayOfWeek,
  differenceDaysBetweenTwoDates,
  getDateFromWeek,
  getInitialDay
} from "@/utils/date"

const Planning = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [weekDays, setWeekDays] = useState<Date[]>([])

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

  useEffect(() => {
    loadDatesWeek()
  }, [currentDate])

  return (
    <div>
      <div>{currentDate.toUTCString()}</div>
      <div>
        <Button onClick={() => changeWeek(false)}>
          <ArrowLeftIcon />
        </Button>
        <Button onClick={() => changeWeek(true)}>
          <ArrowRightIcon />
        </Button>
      </div>
      <div className="flex gap-2">
        {weekDays.map((e, i) => (
          <div key={i} className="flex flex-col gap-2 bg-cyan-100 p-4 rounded">
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">{dayOfWeek(e, true)}</span>
              <span>{dateToString(e)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Planning
