import React, { useEffect, useState } from "react"
import type { OrganizationsWithId } from "@/types/withId"
import { organizationsHeader } from "@/constants/tableHeaders"
import { fetchOrganizations } from "@/lib/organizations"
import { fetchData } from "@/utils/db"
import OrganizationsRows from "@/components/Rows/admin/OrganizationsRows"
import Table from "@/components/Table"

const OrganizationsAdmin = () => {
  const [organizations, setOrganizations] = useState<OrganizationsWithId[]>([])

  useEffect(() => {
    fetchData(fetchOrganizations(), setOrganizations)
  }, [])
  return (
    <Table
      header={organizationsHeader}
      Rows={OrganizationsRows}
      dataT={organizations}
    />
  )
}

export default OrganizationsAdmin
