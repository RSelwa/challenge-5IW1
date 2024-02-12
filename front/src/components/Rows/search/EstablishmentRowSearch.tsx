import React from "react"
import type { EstablishmentsWithId } from "@/types/withId"
import ProfileSearch from "@/components/ui/ProfileSearch"

type Props = {
  establishment: EstablishmentsWithId
}

const EstablishmentRowSearch = ({ establishment }: Props) => {
  return (
    <ProfileSearch
      urlImage=""
      name={establishment.name}
      address={establishment.address}
      zipCode={establishment.zipCode}
      employeeId={establishment.employees[0].id}
    />
  )
}

export default EstablishmentRowSearch
