import React from "react"
import * as Popover from "@radix-ui/react-popover"
import type { ServicesWithId } from "@/types/withId"
import { getHoursMinutes } from "@/utils/date"

type Props = {
  dateOfReservation: Date
  service: ServicesWithId
}

const AvailableSlot = ({ dateOfReservation, service }: Props) => {
  const dayOfReservation = new Date(dateOfReservation).toLocaleDateString(
    "fr-FR"
  ) //jj/mm/yyyy
  const hourOfReservation = getHoursMinutes(dateOfReservation) //hh:mm

  return (
    <Popover.Root>
      <Popover.Trigger className="flex cursor-pointer items-center justify-center rounded bg-cyan-50 px-2 py-1 font-bold hover:bg-cyan-100">
        {getHoursMinutes(dateOfReservation)}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded bg-white p-4 shadow-md">
          <section>
            Vous voulez réserver <i>{service.name}</i> le {dayOfReservation} à
            {hourOfReservation} ?
          </section>
          <Popover.Close />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default AvailableSlot
