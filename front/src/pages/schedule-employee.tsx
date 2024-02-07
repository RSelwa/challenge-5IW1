import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { SemaineTypeWithId } from "@/types/withId"
import { fetchEmployeeWeekSchedules } from "@/lib/employeeSchedule"
import EmployeeWeekEdit from "@/components/employeeWeekEdit"
import { defaultHoraireType } from "@/constants"

const EmployeeSchedule = () => {
  const { employeeId } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [scheduleDays, setScheduleDays] = useState<SemaineTypeWithId[]>(
    Array(7)
      .fill(0)
      .map((_, index) => ({
        id: "",
        employee: employeeId || "",
        day: index + 1,
        startTimeMorning: defaultHoraireType.startTimeMorning,
        endTimeMorning: defaultHoraireType.endTimeMorning,
        startTimeAfternoon: defaultHoraireType.startTimeAfternoon,
        endTimeAfternoon: defaultHoraireType.endTimeAfternoon
      }))
  )

  const fetchEmployeeSchedule = async () => {
    if (!employeeId) return
    setIsLoading(true)
    try {
      // const { employeeWeekSchedules } = await fetchEmployee(employeeId)
      const allWeekSchedules = await fetchEmployeeWeekSchedules()

      const employeeWeekSchedules = allWeekSchedules.filter((weekSchedule) =>
        weekSchedule.employee.includes(employeeId)
      )

      employeeWeekSchedules.forEach((schedule) => {
        setScheduleDays((prevState) => {
          const index = schedule.day
          prevState[index - 1] = schedule
          return [...prevState]
        })
      })
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchEmployeeSchedule()
  }, [])

  return (
    <div className="p-2">
      {isLoading && (
        <div className="flex items-center justify-center">
          <LoaderIcon />
        </div>
      )}
      {!isLoading && employeeId && (
        <div className="grid grid-cols-7 gap-3">
          {scheduleDays.map((day, i) => (
            <EmployeeWeekEdit
              fetchEmployeeSchedule={fetchEmployeeSchedule}
              key={i}
              day={day}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EmployeeSchedule
