import React, { useEffect, useState } from "react"
import type { EstablishmentsWithId } from "@/types/withId"
import { establishmentsHeader } from "@/constants/tableHeaders"
import { fetchEstablishments } from "@/lib/establishments"
import { fetchData } from "@/utils/db"
import EstablishmentsRows from "@/components/Rows/admin/EstablishmentsRows"
import Table from "@/components/Table"

const EstablishmentsAdmin = () => {
  const [establishments, setEstablishments] = useState<EstablishmentsWithId[]>(
    []
  )

  useEffect(() => {
    fetchData(fetchEstablishments(), setEstablishments)
  }, [])
  return (
    <Table
      header={establishmentsHeader}
      Rows={EstablishmentsRows}
      dataT={establishments}
    />
  )
}

export default EstablishmentsAdmin
