import React from "react"
import type { EstablishmentsWithId } from "@/types/withId"

type Props = {
  establishment: EstablishmentsWithId
}

const EstablishmentRowSearch = ({ establishment }: Props) => {
  return <div>{establishment.address}</div>
}

export default EstablishmentRowSearch
