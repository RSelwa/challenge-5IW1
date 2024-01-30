import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { ServicesWithId } from "@/types/withId"
import { fetchServicesByEmployeeId } from "@/lib/services"
import ReservationsPannel from "@/components/ui/reservations-pannel"
import { servicesMock } from "@/mock/services"

const ReservationService = () => {
  const { idEmployee } = useParams()
  if (!idEmployee) return null

  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState<ServicesWithId[]>([])
  const fetchServicesOfEmployee = async () => {
    setIsLoading(true)
    try {
      console.log(idEmployee)
      // const services = await fetchServicesByEmployeeId(idEmployee)
      const services = servicesMock
      setServices(services)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchServicesOfEmployee()
  }, [])

  return (
    <ReservationsPannel
      label=" Choisissez votre motif de consultation"
      isLoading={isLoading}
    >
      <div className="flex flex-col">
        {services.map((service, i) => (
          <Link
            key={i}
            to={`/reservation-creneau/${service.id}?employeeId=${idEmployee}`}
          >
            {service.name}
          </Link>
        ))}
      </div>
    </ReservationsPannel>
  )
}

export default ReservationService
