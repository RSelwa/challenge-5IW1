import React from "react"
import type { RowProps } from "@/types/table"
import type { UsersWithId } from "@/types/withId"
import AdminViewDetails from "@/components/ui/AdminViewDetails"

const UsersRowsAdmin = ({ data }: RowProps<UsersWithId>) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.email}</td>
      <td>
        <AdminViewDetails id={data.id} />
      </td>
    </tr>
  )
}

export default UsersRowsAdmin
