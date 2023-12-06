import React from "react"
import type { RowProps } from "@/types/table"
import type { OrganizationsWithId } from "@/types/withId"
import AdminViewDetails from "@/components/ui/AdminViewDetails"

const OrganizationsRows = ({ data }: RowProps<OrganizationsWithId>) => {
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

export default OrganizationsRows
