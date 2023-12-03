import React, { useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import type { EstablishmentsWithId } from "@/types/withId"
import { fetchEstablishments } from "@/lib/establishments"
import { fetchData } from "@/utils/db"

const EstablishmentsAdmin = () => {
  const [establishments, setEstablishments] = useState<EstablishmentsWithId[]>(
    []
  )

  useEffect(() => {
    fetchData(fetchEstablishments(), setEstablishments)
  }, [])
  return (
    <div>
      {establishments.map((establishment, index) => (
        <div key={index}>
          {establishment.id}
          <Link to={`/admin/establishments/${establishment.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default EstablishmentsAdmin
