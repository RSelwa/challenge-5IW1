import React from "react"
import type { EstablishmentsWithId } from "@/types/withId"
import ProfileSearch from "@/components/ui/ProfileSearch"

type Props = {
  establishment: EstablishmentsWithId
}

const EstablishmentRowSearch = ({ establishment }: Props) => {
  return (
    <ProfileSearch
      address={establishment.address}
      name={establishment.name}
      service={establishment.city}
      zipCode={establishment.zipCode}
      urlImage=""
    />
  )
}

export default EstablishmentRowSearch
