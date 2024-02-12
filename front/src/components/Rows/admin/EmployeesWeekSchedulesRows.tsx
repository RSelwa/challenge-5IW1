import React from "react"
import type { RowProps } from "@/types/table"
import type { SemaineTypeWithId } from "@/types/withId"
import AdminViewDetails from "@/components/ui/AdminViewDetails"

const EmployeeWeekScheduleRows = ({ data }: RowProps<SemaineTypeWithId>) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.employee}</td>
      <td>
        <AdminViewDetails id={data.id} />
      </td>
    </tr>
  )
}

export default EmployeeWeekScheduleRows
