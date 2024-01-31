import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { ServicesWithId } from "@/types/withId"
import { fetchEmployee } from "@/lib/employees"
import ReservationsPannel from "@/components/ui/reservations-pannel"

const ReservationService = () => {
  const { idEmployee } = useParams()
  if (!idEmployee) return null

  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState<ServicesWithId[]>([])
  const fetchServicesOfEmployee = async () => {
    setIsLoading(true)
    try {
      const { services } = await fetchEmployee(idEmployee)
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
            data-state={
              i === 0 ? "first" : i === services.length - 1 ? "last" : "middle"
            }
            className="border p-4 text-gray-800 transition-all hover:bg-hover data-[state=first]:rounded-t-lg data-[state=last]:rounded-b-lg data-[state=first]:border-b-0 data-[state=middle]:border-b-0 data-[state=first]:border-gray-200 data-[state=last]:border-gray-200 data-[state=middle]:border-gray-200"
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
