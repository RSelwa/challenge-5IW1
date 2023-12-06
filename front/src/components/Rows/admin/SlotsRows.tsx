import React from "react"
import type { RowProps } from "@/types/table"
import type { SlotsWithId } from "@/types/withId"
import AdminViewDetails from "@/components/ui/AdminViewDetails"

const SlotsRows = ({ data }: RowProps<SlotsWithId>) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.status}</td>
      <td>
        <AdminViewDetails id={data.id} />
      </td>
    </tr>
  )
}

export default SlotsRows
