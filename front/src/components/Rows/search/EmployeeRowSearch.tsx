import React from "react"
import type { EmployeesWithId } from "@/types/withId"
import ProfileSearch from "@/components/ui/ProfileSearch"

type Props = {
  employee: EmployeesWithId
}

const EmployeeRowSearch = ({ employee }: Props) => {
  return (
    <ProfileSearch
      address="7 rue TAMER"
      service="Ostéopathe"
      name={(employee.firstname, employee.lastname)}
      urlImage=""
      zipCode="75011"
    />
  )
}

export default EmployeeRowSearch
