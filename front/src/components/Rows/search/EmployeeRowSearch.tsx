import React from "react"
import type { EmployeesWithId } from "@/types/withId"
import ProfileSearch from "@/components/ui/ProfileSearch"

type Props = {
  employee: EmployeesWithId
}

const EmployeeRowSearch = ({ employee }: Props) => {
  console.log(employee)
  return (
    <ProfileSearch
      address={employee.establishment.address}
      service={employee.service.name}
      name={(employee.firstname, employee.lastname)}
      urlImage=""
      zipCode={employee.establishment.zipCode}
    />
  )
}

export default EmployeeRowSearch
