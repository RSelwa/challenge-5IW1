import React, { useEffect, useState } from "react"
import type { EmployeeSpecificSchedulesWithId } from "@/types/withId"
import { employeesSpecificSchedulesHeader } from "@/constants/tableHeaders"
import { fetchEmployeeSpecificSchedules } from "@/lib/employeeSpecificSchedules"
import { fetchData } from "@/utils/db"
import EmployeeSpecificScheduleRows from "@/components/Rows/admin/EmployeeSpecificScheduleRows"
import Table from "@/components/Table"

const EmployeeSpecificSchedulesAdmin = () => {
  const [employeeSpecificSchedules, setEmployeeSpecificSchedules] = useState<
    EmployeeSpecificSchedulesWithId[]
  >([])

  useEffect(() => {
    fetchData(fetchEmployeeSpecificSchedules(), setEmployeeSpecificSchedules)
  }, [])
  return (
    <Table
      header={employeesSpecificSchedulesHeader}
      Rows={EmployeeSpecificScheduleRows}
      dataT={employeeSpecificSchedules}
    />
  )
}

export default EmployeeSpecificSchedulesAdmin
