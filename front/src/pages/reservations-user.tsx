import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { SlotsWithId } from "@/types/withId"
import { fetchUser } from "@/lib/users"
import ReservationsPannel from "@/components/ui/reservations-pannel"

const ReservationUser = () => {
  const { idUser } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [reservations, setReservations] = useState<SlotsWithId[]>([])

  const fetchMyReservations = async () => {
    try {
      setIsLoading(true)
      if (!idUser) return
      const { slots } = await fetchUser(idUser)
      console.log(slots)
      setReservations(slots)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMyReservations()
  }, [])

  return (
    <div>
      <ReservationsPannel
        label={`Voici vos résérvations`}
        isLoading={isLoading}
      >
        <div>
          {reservations.map((reservation, i) => (
            <div key={i}>{new Date(reservation.startTime).toString()}</div>
          ))}
        </div>
      </ReservationsPannel>
    </div>
  )
}

export default ReservationUser
