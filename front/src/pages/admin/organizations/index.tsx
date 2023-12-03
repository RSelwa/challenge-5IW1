import React, { useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import type { OrganizationsWithId } from "@/types/withId"
import { fetchOrganizations } from "@/lib/organizations"
import { fetchData } from "@/utils/db"

const OrganizationsAdmin = () => {
  const [organizations, setOrganizations] = useState<OrganizationsWithId[]>([])

  useEffect(() => {
    fetchData(fetchOrganizations(), setOrganizations)
  }, [])
  return (
    <div>
      {organizations.map((organization, index) => (
        <div key={index}>
          {organization.id}
          <Link to={`/admin/organizations/${organization.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default OrganizationsAdmin
