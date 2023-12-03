import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { EmployeeSpecificSchedulesWithId } from "@/types/withId"
import { fetchEmployeeSpecificSchedule } from "@/lib/employeeSpecificSchedules"
import { fetchData } from "@/utils/db"
import BackButton from "@/components/ui/BackButton"

const EmployeeSpecificSchedulesIdAdmin = () => {
  const { id } = useParams()
  const [employeeSpecificSchedule, setEmployeeSpecificSchedule] =
    useState<EmployeeSpecificSchedulesWithId>()
  useEffect(() => {
    fetchData(
      fetchEmployeeSpecificSchedule(id || ""),
      setEmployeeSpecificSchedule as Dispatch<
        SetStateAction<EmployeeSpecificSchedulesWithId>
      >
    )
  }, [])
  if (!employeeSpecificSchedule) return <LoaderIcon />

  return (
    <div>
      <BackButton />
      {employeeSpecificSchedule.id}
    </div>
  )
}

export default EmployeeSpecificSchedulesIdAdmin
