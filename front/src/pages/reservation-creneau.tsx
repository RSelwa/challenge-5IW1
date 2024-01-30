import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ServicesWithId } from "@/types/withId"
import { fetchService } from "@/lib/services"
import ReservationsPannel from "@/components/ui/reservations-pannel"
import Planning from "@/pages/planning"

const ReservationCreneau = () => {
  const { idReservation } = useParams()
  const employeeId = new URLSearchParams(window.location.search).get(
    "employeeId"
  )

  if (!idReservation || !employeeId) return null
  console.log(idReservation)

  const [isLoading, setIsLoading] = useState(false)
  const [service, setService] = useState<ServicesWithId>()
  const fetchServiceData = async () => {
    setIsLoading(true)
    try {
      setService(undefined)
      const service = await fetchService(idReservation)
      setService(service)
      console.log(service)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchServiceData()
  }, [])

  return (
    <ReservationsPannel label=" Choisissez votre creneau" isLoading={isLoading}>
      {service && (
        <section>
          {service.name}

          <Planning employeeId={employeeId} duration={service.duration} />
        </section>
      )}
    </ReservationsPannel>
  )
}

export default ReservationCreneau
