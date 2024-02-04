import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { SemaineTypeWithId } from "@/types/withId"
import { daysInWeekSchedule } from "@/constants/date"
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
        employeeId: employeeId || "",
        dayOfWeek: index,
        startTimeMorning: defaultHoraireType.startTimeMorning,
        endTimeMorning: defaultHoraireType.endTimeMorning,
        startTimeAfternoon: defaultHoraireType.startTimeAfternoon,
        endTimeAfternoon: defaultHoraireType.endTimeAfternoon
      }))
  )

  const fetchEmployeeSchedule = async () => {
    setIsLoading(true)
    try {
      console.log(employeeId)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchEmployeeSchedule()
  }, [])

  return (
    <div>
      {!isLoading && employeeId && (
        <div className="grid grid-cols-7 gap-3">
          {scheduleDays.map((day, i) => (
            <EmployeeWeekEdit key={i} day={day} employeeId={employeeId} />
          ))}
        </div>
      )}
    </div>
  )
}

export default EmployeeSchedule
