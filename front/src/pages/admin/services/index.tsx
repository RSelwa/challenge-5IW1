import React, { useEffect, useState } from "react"
import type { ServicesWithId } from "@/types/withId"
import { servicesHeader } from "@/constants/tableHeaders"
import { fetchServices } from "@/lib/services"
import { fetchData } from "@/utils/db"
import ServicesRows from "@/components/Rows/admin/ServicesRows"
import Table from "@/components/Table"

const ServicesAdmin = () => {
  const [services, setServices] = useState<ServicesWithId[]>([])

  useEffect(() => {
    fetchData(fetchServices(), setServices)
  }, [])
  return <Table header={servicesHeader} Rows={ServicesRows} dataT={services} />
}

export default ServicesAdmin
