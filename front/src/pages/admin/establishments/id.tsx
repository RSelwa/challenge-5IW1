import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { EstablishmentsWithId } from "@/types/withId"
import { fetchEstablishment } from "@/lib/establishments"
import { fetchData } from "@/utils/db"
import BackButton from "@/components/ui/BackButton"

const EstablishmentsIdAdmin = () => {
  const { id } = useParams()
  const [establishment, setEstablishment] = useState<EstablishmentsWithId>()
  useEffect(() => {
    fetchData(
      fetchEstablishment(id || ""),
      setEstablishment as Dispatch<SetStateAction<EstablishmentsWithId>>
    )
  }, [])
  if (!establishment) return <LoaderIcon />

  return (
    <div>
      <BackButton />
      {establishment.id}
    </div>
  )
}

export default EstablishmentsIdAdmin
