import type { Dispatch, SetStateAction } from "react"
import React, { Fragment, useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross1Icon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { Link, useParams } from "react-router-dom"
import type { SlotsStatus } from "@/types/api/slots"
import type { SlotsWithId } from "@/types/withId"
import { changeReservationStatus } from "@/lib/slots"
import { fetchUser } from "@/lib/users"
import { dateToString, getHoursMinutes } from "@/utils/date"
import Notation from "@/components/Notations"
import ReservationsPannel from "@/components/ui/reservations-pannel"
import Planning from "@/pages/planning"
import { Translate } from "react-auto-translate"


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
  const employeeId: string | undefined = (
    reservation.service as any
  ).employee.replace("/api/employees/", "")

  // const slotId = () => {
  //   const serviceWithId = (reservation.service as any).slots.find(
  //     (slot: any) => slot.id !== undefined
  //   )
  //   return serviceWithId ? serviceWithId.id : undefined
  // }
  const serviceId = () => {
    const serviceWithId = (reservation.service as any).slots.find(
      (slot: any) => slot.service !== undefined
    )
    return serviceWithId ? serviceWithId.service : undefined
  }

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
      <div className="flex gap-2 text-sm">
        {reservation.status === "reserved" && (
          <button
            className="invisible rounded bg-green-400 px-4 py-2 text-white hover:bg-green-700 group-hover:visible"
            onClick={() =>
              changeReservationStatus(
                reservation.id,
                "passed",
                fetchMyReservations,
                setIsLoading
              )
            }
          >
          <Translate> Marquer comme passé</Translate>
          </button>
        )}
        {reservation.status === "reserved" && (
          <button
            className="invisible rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700 group-hover:visible"
            onClick={() =>
              changeReservationStatus(
                reservation.id,
                "canceled",
                fetchMyReservations,
                setIsLoading
              )
            }
          >
            <Translate>Annuler</Translate>
          </button>
        )}
        {reservation.status === "reserved" && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="invisible rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 group-hover:visible">
                <Translate>Décaller le rendez-vous</Translate>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/60" />
              <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] max-w-[90vw] translate-x-[-50%]  translate-y-[-50%] rounded-[6px] bg-white  p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                {employeeId && serviceId() && (
                  <Planning
                    duration={parseInt(reservation.duration)}
                    employeeId={employeeId}
                    serviceId={serviceId()}
                    serviceName={""}
                    idReservation={reservation.id}
                  />
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
        {reservation.status === "passed" && employeeId && (
          <Popover.Root>
            <Popover.Trigger className="invisible rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 group-hover:visible">
              <Translate>Notez le practicien</Translate>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)]">
                <Popover.Close
                  className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
                  aria-label="Close"
                >
                  <Cross1Icon />
                </Popover.Close>
                <Popover.Arrow className="fill-white" />
                <Notation idNotationTarget={employeeId} />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
        {reservation.status === "passed" && (
          <Link
            className="invisible rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-700 group-hover:visible"
            to={`/reservation-creneau/${serviceId().replace("/api/services/", "")}?employeeId=${employeeId}`}
          >
            <Translate>Reprendre un rendez-vous</Translate>
          </Link>
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

  const status = [
    { label: "Réservations prévues", status: "reserved" },
    { label: "Réservations annulées", status: "canceled" },
    { label: "Réservations passées", status: "passed" }
  ]
  return (
    <div>
      <ReservationsPannel
        label={`Voici vos résérvations`}
        isLoading={isLoading}
      >
        <div className="flex flex-col gap-5">
          {status.map((status, index) => (
            <Fragment key={index}>
              <h1>{status.label}</h1>
              <div>
                {reservations
                  .filter((reservation) => reservation.status === status.status)
                  .map((reservation, i) => (
                    <ReservationButton
                      key={i}
                      reservations={reservations.filter(
                        (reservation) => reservation.status === status.status
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
            </Fragment>
          ))}
        </div>
      </ReservationsPannel>
    </div>
  )
}

export default ReservationUser
