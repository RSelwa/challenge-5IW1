import React, { useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import type { EmployeesWithId } from "@/types/withId"
import { fetchEmployees } from "@/lib/employees"
import { fetchData } from "@/utils/db"

const EmployeesAdmin = () => {
  const [employees, setEmployees] = useState<EmployeesWithId[]>([])

  useEffect(() => {
    fetchData(fetchEmployees(), setEmployees)
  }, [])
  return (
    <div>
      {employees.map((employee, index) => (
        <div key={index}>
          {employee.id}
          <Link to={`/admin/employees/${employee.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default EmployeesAdmin
