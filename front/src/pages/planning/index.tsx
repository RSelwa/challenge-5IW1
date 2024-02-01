import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { LoaderIcon } from "react-hot-toast"
import type { PlanningWeekDay, Slots } from "@/types/api/slots"
import type { ServicesWithId } from "@/types/withId"
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
import { semaineTypeData } from "@/constants"
import AvailableSlot from "@/pages/planning/available-slot"
import { cn } from "@/utils"

const Planning = ({ service }: { service: ServicesWithId }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [needLoadReservations, setNeedLoadReservations] = useState(false)
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

  const loadDatesWeek = () => {
    setWeekDays([])
    const { firstday, lastday } = getDateFromWeek(currentDate)
    const diff = differenceDaysBetweenTwoDates(firstday, lastday)

    for (let index = 0; index < diff; index++)
      setWeekDays((prevState) => [
        ...prevState,
        {
          date: getInitialDay(
            new Date(firstday.getTime() + index * dayInSeconds * 1000)
          ),
          reservations: []
        }
      ])
    setNeedLoadReservations((prevState) => !prevState)
  }
  const cantChangePreviousWeek = (): boolean => {
    const currentTime = new Date().getTime()
    const begginingOfTheWeek = currentDate.getTime()
    const endOfTheWeek = currentDate.getTime() + weekInSeconds * 1000

    if (begginingOfTheWeek < currentTime && currentTime < endOfTheWeek)
      return true
    return false
  }

  const fetchSemaineType = (employeeId: string) => {
    try {
      // const response = await fetch(
      //   `${import.meta.env.VITE_API_URL}/auth`,
      //   requestOptions({ method: "POST", data: data })
      // )
      // if (!response.ok) throw new Error("Something went wrong")
      // const { token } = await response.json()
    } catch (error) {
      console.log(employeeId)

      console.error(error)
    }
  }

  const fetchReservations = async (employeeId: string) => {
    try {
      const { services } = await fetchEmployee(employeeId)

      // reservation pour tous les services toujours actif
      const slotsData = services
        .map((service) => service.slots)
        .flat()
        .filter((slot) => slot.status === "reserved")

      // Filter reservations during this week
      const mondayOfWeek = weekDays?.[0]?.date.getTime() || new Date().getTime()
      const endOfWeek = mondayOfWeek + dayInSeconds * 1000 * 5 // Vendredi soir

      const reservationsDuringWeek = slotsData.filter(
        (slot) =>
          new Date(slot.startTime).getTime() > mondayOfWeek &&
          new Date(slot.startTime).getTime() < endOfWeek
      )

      // Create empty array of Slots[]
      const weekDaysReservations: Slots[][] = [[], [], [], [], [], [], []]

      // Attribute each reservations to the right days
      reservationsDuringWeek.forEach((reservation) => {
        weekDays.forEach((dayOfWeek, indexOfDay) => {
          if (isInSameDay(dayOfWeek.date, new Date(reservation.startTime)))
            weekDaysReservations[indexOfDay].push(reservation)
        })
      })
      console.log(weekDaysReservations)

      setWeekDays((prevState) =>
        prevState.map((day, indexOfDay) => ({
          date: day.date,
          reservations: weekDaysReservations[indexOfDay].sort(
            (a, b) => parseInt(a.startTime) - parseInt(b.startTime)
          )
        }))
      )
    } catch (error) {
      console.error(error)
    }
  }
  const fetchDataForPlanning = async () => {
    setIsLoading(true)
    await Promise.all([
      fetchSemaineType(service.employee.id),
      fetchReservations(service.employee.id)
    ])
    setIsLoading(false)
  }
  useEffect(() => {
    loadDatesWeek()
    fetchDataForPlanning()
  }, [currentDate])

  useEffect(() => {
    fetchDataForPlanning()
  }, [needLoadReservations])

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
                    semaineTypeUser: semaineTypeData,
                    duration: service.duration
                  }).map((dateOfReservation, i) =>
                    isPlanningExpanded || i < 4 ? (
                      <AvailableSlot
                        key={i}
                        service={service}
                        dateOfReservation={dateOfReservation}
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
