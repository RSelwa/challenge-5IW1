import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { LoaderIcon } from "react-hot-toast"
import type { PlanningWeekDay, Slots } from "@/types/api/slots"
import type {
  EmployeeSpecificSchedulesWithId,
  SemaineTypeWithId
} from "@/types/withId"
import { dayInSeconds, weekInSeconds } from "@/constants/date"
import { fetchEmployee } from "@/lib/employees"
import {
  dateToString,
  dayOfWeek,
  differenceDaysBetweenTwoDates,
  getAvailableReservation,
  getDateFromWeek,
  getInitialDay,
  isInSameDay
} from "@/utils/date"
import AvailableSlot from "@/pages/planning/available-slot"
import { cn } from "@/utils"

const Planning = ({
  duration,
  employeeId,
  idReservation,
  serviceId,
  serviceName
}: {
  duration: number
  employeeId: string
  serviceId: string
  serviceName: string
  idReservation?: string
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [weekSchedule, setWeekSchedule] = useState<SemaineTypeWithId[]>([])
  const [weekSpecificSchedule, setWeekSpecificSchedule] = useState<
    EmployeeSpecificSchedulesWithId[]
  >([])
  const [isPlanningExpanded, setIsPlanningExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [weekDays, setWeekDays] = useState<PlanningWeekDay[]>([])
  const scaleButton = 24
  const changeWeek = (nextWeek: boolean) =>
    setCurrentDate(
      (prevSate) =>
        new Date(
          prevSate.getTime() +
            (nextWeek ? weekInSeconds : -weekInSeconds) * 1000
        )
    )

  const cantChangePreviousWeek = (): boolean => {
    const currentTime = new Date().getTime()
    const begginingOfTheWeek = currentDate.getTime()
    const endOfTheWeek = currentDate.getTime() + weekInSeconds * 1000

    if (begginingOfTheWeek < currentTime && currentTime < endOfTheWeek)
      return true
    return false
  }

  const fetchReservations = async (employeeId: string) => {
    setIsLoading(true)
    try {
      const { services, employeeWeekSchedules, employeeSpecificSchedules } =
        await fetchEmployee(employeeId)

      // Set days
      const { firstday, lastday } = getDateFromWeek(currentDate)
      const diff = differenceDaysBetweenTwoDates(firstday, lastday)
      const newWeekDays: PlanningWeekDay[] = []

      for (let index = 0; index < diff; index++)
        newWeekDays.push({
          date: getInitialDay(
            new Date(firstday.getTime() + index * dayInSeconds * 1000)
          ),
          reservations: []
        })

      setWeekDays(newWeekDays)

      // Filter all data
      setWeekSchedule(employeeWeekSchedules)
      setWeekSpecificSchedule(
        employeeSpecificSchedules.filter(
          (schedule) => schedule.status !== "REFUSED"
        )
      )

      // reservation pour tous les services toujours actif
      const slotsData = services
        .map((service) => service.slots)
        .flat()
        .filter((slot) => slot.status !== "canceled")

      // Filter reservations during this week
      const mondayOfWeek =
        newWeekDays?.[0]?.date.getTime() || new Date().getTime()
      const endOfWeek = mondayOfWeek + dayInSeconds * 1000 * 5 // Vendredi soir

      const reservationsDuringWeek = slotsData.filter(
        (slot) =>
          parseInt(slot.startTime) * 1000 > mondayOfWeek &&
          parseInt(slot.startTime) * 1000 < endOfWeek
      )

      // Create empty array of Slots[]
      const weekDaysReservations: Slots[][] = [[], [], [], [], [], [], []]

      // Attribute each reservations to the right days
      reservationsDuringWeek.forEach((reservation) => {
        newWeekDays.forEach((dayOfWeek, indexOfDay) => {
          if (
            isInSameDay(
              dayOfWeek.date,
              new Date(parseInt(reservation.startTime) * 1000)
            )
          )
            weekDaysReservations[indexOfDay].push(reservation)
        })
      })
      setWeekDays(
        newWeekDays.map((day, indexOfDay) => ({
          date: day.date,
          reservations: weekDaysReservations[indexOfDay]
        }))
      )
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchReservations(employeeId)
  }, [currentDate])

  return (
    <div className="flex w-fit gap-4 rounded bg-white p-2">
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
      {isLoading && <LoaderIcon />}
      {!isLoading && (
        <div>
          <div className="flex gap-2">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col gap-2 rounded ">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold">
                    {dayOfWeek(day.date, true)}
                  </span>
                  <span>{dateToString(day.date)}</span>
                </div>
                <div className="flex flex-col gap-2 ">
                  {getAvailableReservation({
                    day: day.date,
                    reservations: day.reservations,
                    semaineTypeUser: weekSchedule,
                    specificSchedule: weekSpecificSchedule,
                    duration: duration
                  }).map((dateOfReservation, i) =>
                    isPlanningExpanded || i < 4 ? (
                      <AvailableSlot
                        key={i}
                        idReservation={idReservation}
                        dateOfReservation={dateOfReservation}
                        duration={duration}
                        serviceId={serviceId}
                        serviceName={serviceName}
                      />
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            className="mt-3 w-full font-bold text-cyan-500"
            onClick={() => setIsPlanningExpanded((prevState) => !prevState)}
          >
            Voir {isPlanningExpanded ? "moins" : "plus"} d'horaires
          </Button>
        </div>
      )}

      <Button
        variant="ghost"
        onClick={() => changeWeek(true)}
        className={cn("text-cyan-500")}
      >
        <ChevronRightIcon height={scaleButton} width={scaleButton} />
      </Button>
    </div>
  )
}

export default Planning
