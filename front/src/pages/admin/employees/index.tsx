import React, { useEffect, useState } from "react"
import type { EmployeesWithId } from "@/types/withId"
import { employeesHeader } from "@/constants/tableHeaders"
import { fetchEmployees } from "@/lib/employees"
import { fetchData } from "@/utils/db"
import EmployeesRows from "@/components/Rows/admin/EmployeesRows"
import Table from "@/components/Table"

const EmployeesAdmin = () => {
  const [employees, setEmployees] = useState<EmployeesWithId[]>([])

  useEffect(() => {
    fetchData(fetchEmployees(), setEmployees)
  }, [])
  return (
    <Table header={employeesHeader} Rows={EmployeesRows} dataT={employees} />
  )
}

export default EmployeesAdmin
