import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { SlotsWithId } from "@/types/withId"
import { fetchSlot } from "@/lib/slots"
import { fetchData } from "@/utils/db"
import BackButton from "@/components/ui/BackButton"

const SlotsIdAdmin = () => {
  const { id } = useParams()
  const [slot, setSlot] = useState<SlotsWithId>()

  useEffect(() => {
    fetchData(
      fetchSlot(id || ""),
      setSlot as Dispatch<SetStateAction<SlotsWithId>>
    )
  }, [])
  if (!slot) return <LoaderIcon />
  return (
    <div>
      <BackButton />
      {slot.id}
    </div>
  )
}

export default SlotsIdAdmin
