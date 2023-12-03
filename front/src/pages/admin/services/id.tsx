import BackButton from "@/components/ui/BackButton"
import { fetchService } from "@/lib/services"
import type { ServicesWithId } from "@/types/withId"
import { fetchData } from "@/utils/db"
import type { Dispatch, SetStateAction} from "react";
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"

const ServicesIdAdmin = () => {
  const { id } = useParams()
  const [service, setService] = useState<ServicesWithId>()
  useEffect(() => {
    fetchData(
      fetchService(id || ""),
      setService as Dispatch<SetStateAction<ServicesWithId>>
    )
  }, [])
  if (!service) return <LoaderIcon />

  return (
    <div>
      <BackButton />
      {service.id}
    </div>
  )
}

export default ServicesIdAdmin
