import React from "react"
import type { RowProps } from "@/types/table"
import type { NotationtionsWithId } from "@/types/withId"
import AdminViewDetails from "@/components/ui/AdminViewDetails"

const NotationsRows = ({ data }: RowProps<NotationtionsWithId>) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.idNotationFrom}</td>
      <td>{data.idNotationTarget}</td>
      <td>
        <AdminViewDetails id={data.id} />
      </td>
    </tr>
  )
}

export default NotationsRows
