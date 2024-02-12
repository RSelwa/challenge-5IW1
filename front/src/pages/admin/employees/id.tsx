import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { EmployeesWithId } from "@/types/withId"
import { fetchEmployee } from "@/lib/employees"
import { fetchData } from "@/utils/db"
import BackButton from "@/components/ui/BackButton"

const EmployeesIdAdmin = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState<EmployeesWithId>()
  useEffect(() => {
    fetchData(
      fetchEmployee(id || ""),
      setEmployee as Dispatch<SetStateAction<EmployeesWithId>>
    )
  }, [])
  if (!employee) return <LoaderIcon />

  return (
    <div>
      <BackButton />
      {employee.id}
    </div>
  )
}

export default EmployeesIdAdmin
