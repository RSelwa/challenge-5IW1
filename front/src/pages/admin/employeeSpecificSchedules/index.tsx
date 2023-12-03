import React, { useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import type { EmployeeSpecificSchedulesWithId } from "@/types/withId"
import { fetchEmployeeSpecificSchedules } from "@/lib/employeeSpecificSchedules"
import { fetchData } from "@/utils/db"

const EmployeeSpecificSchedulesAdmin = () => {
  const [employeeSpecificSchedules, setEmployeeSpecificSchedules] = useState<
    EmployeeSpecificSchedulesWithId[]
  >([])

  useEffect(() => {
    fetchData(fetchEmployeeSpecificSchedules(), setEmployeeSpecificSchedules)
  }, [])
  return (
    <div>
      {employeeSpecificSchedules.map((employeeSpecificSchedule, index) => (
        <div key={index}>
          {employeeSpecificSchedule.id}
          <Link
            to={`/admin/employeeSpecificSchedules/${employeeSpecificSchedule.id}`}
          >
            <Button>View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default EmployeeSpecificSchedulesAdmin
