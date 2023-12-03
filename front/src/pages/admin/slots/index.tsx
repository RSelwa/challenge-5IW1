import React, { useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import type { SlotsWithId } from "@/types/withId"
import { fetchSlots } from "@/lib/slots"
import { fetchData } from "@/utils/db"

const SlotsAdmin = () => {
  const [slots, setSlots] = useState<SlotsWithId[]>([])

  useEffect(() => {
    fetchData(fetchSlots(), setSlots)
  }, [])
  return (
    <div>
      {slots.map((slot, index) => (
        <div key={index}>
          {slot.status}
          {slot.id}
          <Link to={`/admin/slots/${slot.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SlotsAdmin
