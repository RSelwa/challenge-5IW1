import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { OrganizationsWithId } from "@/types/withId"
import { fetchOrganization } from "@/lib/organizations"
import { fetchData } from "@/utils/db"
import BackButton from "@/components/ui/BackButton"

const OrganizationsIdAdmin = () => {
  const { id } = useParams()
  const [organization, setOrganization] = useState<OrganizationsWithId>()
  useEffect(() => {
    fetchData(
      fetchOrganization(id || ""),
      setOrganization as Dispatch<SetStateAction<OrganizationsWithId>>
    )
  }, [])
  if (!organization) return <LoaderIcon />

  return (
    <div>
      <BackButton />
      {organization.id}
    </div>
  )
}

export default OrganizationsIdAdmin
