import React from "react"
import type { EmployeesWithId } from "@/types/withId"

type Props = {
  employee: EmployeesWithId
}

const EmployeeRowSearch = ({ employee }: Props) => {
  return <div>{employee.firstname}</div>
}

export default EmployeeRowSearch
