import React, { useEffect, useState } from "react"
import type { SlotsWithId } from "@/types/withId"
import { slotsHeader } from "@/constants/tableHeaders"
import { fetchSlots } from "@/lib/slots"
import { fetchData } from "@/utils/db"
import SlotsRows from "@/components/Rows/admin/SlotsRows"
import Table from "@/components/Table"

const SlotsAdmin = () => {
  const [slots, setSlots] = useState<SlotsWithId[]>([])

  useEffect(() => {
    fetchData(fetchSlots(), setSlots)
  }, [])
  return <Table header={slotsHeader} Rows={SlotsRows} dataT={slots} />
}

export default SlotsAdmin
