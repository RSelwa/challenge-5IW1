import React, { useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import type { ServicesWithId } from "@/types/withId"
import { fetchServices } from "@/lib/services"
import { fetchData } from "@/utils/db"

const ServicesAdmin = () => {
  const [services, setServices] = useState<ServicesWithId[]>([])

  useEffect(() => {
    fetchData(fetchServices(), setServices)
  }, [])
  return (
    <div>
      {services.map((service, index) => (
        <div key={index}>
          {service.id}
          <Link to={`/admin/services/${service.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ServicesAdmin
