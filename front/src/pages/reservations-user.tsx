import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { SlotsStatus } from "@/types/api/slots"
import type { SlotsWithId } from "@/types/withId"
import { changeReservationStatus } from "@/lib/slots"
import { fetchUser } from "@/lib/users"
import { dateToString, getHoursMinutes } from "@/utils/date"
import ReservationsPannel from "@/components/ui/reservations-pannel"

const ReservationButton = ({
  reservations,
  reservation,
  i,
  changeReservationStatus,
  fetchMyReservations,
  setIsLoading
}: {
  reservations: SlotsWithId[]
  reservation: SlotsWithId
  i: number
  changeReservationStatus: (
    id: string,
    status: SlotsStatus,
    callBack: () => void,
    setIsLoading: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>
  fetchMyReservations: () => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div
      key={i}
      data-status={reservation.status}
      data-state={
        i === 0 ? "first" : i === reservations.length - 1 ? "last" : "middle"
      }
      className="group flex items-center justify-between border p-4 text-gray-800 transition-all hover:bg-hover data-[state=first]:rounded-t-lg data-[state=last]:rounded-b-lg data-[state=first]:border-b-0 data-[state=middle]:border-b-0 data-[state=first]:border-gray-200 data-[state=last]:border-gray-200 data-[state=middle]:border-gray-200 data-[status=canceled]:bg-red-100 data-[status=passed]:bg-gray-300 data-[status=canceled]:hover:bg-red-100"
    >
      <p>
        {dateToString(new Date(reservation.startTime))} -{" "}
        {getHoursMinutes(new Date(reservation.startTime))}
      </p>
      <div>
        {reservation.status === "reserved" && (
          <button
            className="invisible rounded px-4 py-2 text-green-400 hover:bg-gray-200 group-hover:visible"
            onClick={() =>
              changeReservationStatus(
                reservation.id,
                "passed",
                fetchMyReservations,
                setIsLoading
              )
            }
          >
            Mark as done
          </button>
        )}
        {reservation.status === "reserved" && (
          <button
            className="invisible rounded px-4 py-2 text-red-400 hover:bg-gray-200 group-hover:visible"
            onClick={() =>
              changeReservationStatus(
                reservation.id,
                "canceled",
                fetchMyReservations,
                setIsLoading
              )
            }
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}

const ReservationUser = () => {
  const { idUser } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [reservations, setReservations] = useState<SlotsWithId[]>([])

  const fetchMyReservations = async () => {
    try {
      setIsLoading(true)
      if (!idUser) return
      const { slots } = await fetchUser(idUser)
      setReservations(
        slots.sort(
          (a, b) =>
            new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )
      )
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
        <div className="flex flex-col gap-5">
          <h1>Réservations prévues</h1>
          <div>
            {reservations
              .filter((reservation) => reservation.status === "reserved")
              .map((reservation, i) => (
                <ReservationButton
                  reservations={reservations.filter(
                    (reservation) => reservation.status === "reserved"
                  )}
                  reservation={reservation}
                  i={i}
                  changeReservationStatus={changeReservationStatus}
                  fetchMyReservations={fetchMyReservations}
                  setIsLoading={setIsLoading}
                />
              ))}
          </div>
          <hr />
          <h1>Réservations annulées</h1>
          <div>
            {reservations
              .filter((reservation) => reservation.status === "canceled")
              .map((reservation, i) => (
                <ReservationButton
                  reservations={reservations.filter(
                    (reservation) => reservation.status === "canceled"
                  )}
                  reservation={reservation}
                  i={i}
                  changeReservationStatus={changeReservationStatus}
                  fetchMyReservations={fetchMyReservations}
                  setIsLoading={setIsLoading}
                />
              ))}
          </div>
          <hr />
          <h1>Réservations passées</h1>
          <div>
            {reservations
              .filter((reservation) => reservation.status === "passed")
              .map((reservation, i) => (
                <ReservationButton
                  setIsLoading={setIsLoading}
                  reservations={reservations.filter(
                    (reservation) => reservation.status === "passed"
                  )}
                  reservation={reservation}
                  i={i}
                  changeReservationStatus={changeReservationStatus}
                  fetchMyReservations={fetchMyReservations}
                />
              ))}
          </div>
        </div>
      </ReservationsPannel>
    </div>
  )
}

export default ReservationUser
