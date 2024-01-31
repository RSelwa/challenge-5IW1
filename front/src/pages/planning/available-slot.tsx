import React from "react"
import * as Popover from "@radix-ui/react-popover"
import type { Reservation } from "@/types/api/reservations"
import type { ServicesWithId } from "@/types/withId"
import { postReservation } from "@/lib/reservation"
import { getHoursMinutes } from "@/utils/date"
import { parseJwt } from "@/utils/redux"

type Props = {
  dateOfReservation: Date
  service: ServicesWithId
}

const AvailableSlot = ({ dateOfReservation, service }: Props) => {
  const token = parseJwt(localStorage.getItem("token") || "")
  const dayOfReservation = new Date(dateOfReservation).toLocaleDateString(
    "fr-FR"
  ) //jj/mm/yyyy
  const hourOfReservation = getHoursMinutes(dateOfReservation) //hh:mm

  const createReservation = async () =>
    // dateOfReservation: Date,
    // service: ServicesWithId
    {
      try {
        const newReservation: Reservation = {
          date: dateOfReservation.toISOString(),
          serviceId: service.id,
          userId: token.id
        }
        console.log(newReservation)

        await postReservation(newReservation)
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <Popover.Root>
      <Popover.Trigger className="flex cursor-pointer items-center justify-center rounded bg-cyan-50 px-2 py-1 font-bold hover:bg-cyan-100">
        {getHoursMinutes(dateOfReservation)}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex max-w-[350px] flex-col items-center gap-6 rounded bg-white p-4 shadow-xl">
          <p className="mx-auto  text-center">
            Vous voulez réserver <i className="font-bold">{service.name}</i> le{" "}
            {dayOfReservation} à {hourOfReservation} ?
          </p>
          <div className="flex w-fit items-center gap-4 ">
            <Popover.Close className="rounded bg-red-500 p-2 px-4 text-white transition-all hover:bg-red-700">
              Non
            </Popover.Close>
            <button
              className="rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-700"
              onClick={() => createReservation()}
            >
              Save
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default AvailableSlot
