import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { ServicesWithId } from "@/types/withId"
import { fetchService } from "@/lib/services"
import ReservationsPannel from "@/components/ui/reservations-pannel"
import Planning from "@/pages/planning"

const ReservationCreneau = () => {
  const { idReservation } = useParams()
  const employeeId = new URLSearchParams(window.location.search).get(
    "employeeId"
  )
  if (!idReservation || !employeeId) return null

  const [isLoading, setIsLoading] = useState(false)
  const [service, setService] = useState<ServicesWithId>()
  const fetchServiceData = async () => {
    setIsLoading(true)
    try {
      setService(undefined)
      const service = await fetchService(idReservation)
      setService(service)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchServiceData()
  }, [])

  return (
    <ReservationsPannel
      label={`Choisissez votre creneau  ${service ? "pour - " + service?.name : ""}`}
      isLoading={isLoading}
    >
      {service && (
        <section>
          <Planning
            duration={service.duration}
            employeeId={service.employee.id}
            serviceId={service.id}
            serviceName={service.name}
          />
        </section>
      )}
    </ReservationsPannel>
  )
}

export default ReservationCreneau
