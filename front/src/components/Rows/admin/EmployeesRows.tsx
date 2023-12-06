import React from "react"
import type { RowProps } from "@/types/table"
import type { EmployeesWithId } from "@/types/withId"
import AdminViewDetails from "@/components/ui/AdminViewDetails"

const EmployeesRows = ({ data }: RowProps<EmployeesWithId>) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{(data.firstname, data.lastname)}</td>
      <td>
        <AdminViewDetails id={data.id} />
      </td>
    </tr>
  )
}

export default EmployeesRows
