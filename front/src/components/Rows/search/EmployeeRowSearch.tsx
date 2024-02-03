import React from "react"
import type { EmployeesWithId } from "@/types/withId"
import ProfileSearch from "@/components/ui/ProfileSearch"

type Props = {
  employee: EmployeesWithId
}

const EmployeeRowSearch = ({ employee }: Props) => {
  return (
    <ProfileSearch
      employeeId={employee.id}
      address={employee.establishment.address}
      name={(employee.firstname, employee.lastname)}
      urlImage=""
      zipCode={employee.establishment.zipCode}
    />
  )
}

export default EmployeeRowSearch
