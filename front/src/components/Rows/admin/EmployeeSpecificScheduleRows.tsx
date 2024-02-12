import React from "react"
import type { RowProps } from "@/types/table"
import type { EmployeeSpecificSchedulesWithId } from "@/types/withId"
import AdminViewDetails from "@/components/ui/AdminViewDetails"

const EmployeeSpecificScheduleRows = ({
  data
}: RowProps<EmployeeSpecificSchedulesWithId>) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.type}</td>
      <td>
        <AdminViewDetails id={data.id} />
      </td>
    </tr>
  )
}

export default EmployeeSpecificScheduleRows
