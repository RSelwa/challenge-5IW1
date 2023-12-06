import React from "react"
import type { RowProps } from "@/types/table"
import type { ServicesWithId } from "@/types/withId"
import AdminViewDetails from "@/components/ui/AdminViewDetails"

const ServicesRows = ({ data }: RowProps<ServicesWithId>) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>
        <AdminViewDetails id={data.id} />
      </td>
    </tr>
  )
}

export default ServicesRows
