import React, { useState } from "react"
import * as Popover from "@radix-ui/react-popover"
import { LoaderIcon } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import type { Slots } from "@/types/api/slots"
import { SLOT_API_ROUTES } from "@/constants/db"
import { postSlot } from "@/lib/slots"
import { getHoursMinutes, toIsoString } from "@/utils/date"
import { requestOptions } from "@/utils/db"
import { parseJwt } from "@/utils/redux"
import { Translate } from "react-auto-translate"


type Props = {
  dateOfReservation: Date
  idReservation?: string
  duration: number
  serviceId: string
  serviceName: string
}

const AvailableSlot = ({
  dateOfReservation,
  duration,
  serviceId,
  serviceName,
  idReservation
}: Props) => {
  const navigate = useNavigate()
  const token = parseJwt(localStorage.getItem("token") || "")
  const dayOfReservation = new Date(dateOfReservation).toLocaleDateString(
    "fr-FR"
  ) //jj/mm/yyyy
  const hourOfReservation = getHoursMinutes(dateOfReservation) //hh:mm
  const [isLoading, setIsLoading] = useState(false)
  const createReservation = async () => {
    try {
      setIsLoading(true)

      const newSlot = {
        duration: duration,
        status: "reserved",
        startTime: toIsoString(dateOfReservation),
        service: "/api/services/" + serviceId,
        user: "/api/users/" + token.id
      }

      await postSlot(newSlot as unknown as Slots)
      navigate(`/reservations/${token.id}`)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const modifyReservation = async () => {
    try {
      if (!idReservation) return
      setIsLoading(true)

      const newDate = { startTime: toIsoString(dateOfReservation) }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${SLOT_API_ROUTES}/${idReservation}`,
        requestOptions({
          method: "PATCH",
          body: JSON.stringify(newDate)
        })
      )
      if (!response.ok) throw new Error("Something went wrong")
      navigate(0)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="flex cursor-pointer items-center justify-center rounded bg-cyan-50 px-2 py-1 font-bold hover:bg-cyan-100">
        {getHoursMinutes(dateOfReservation)}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="flex max-w-[350px] flex-col items-center gap-6 rounded bg-white p-4 shadow-xl">
          <p className="mx-auto  text-center">
            <Translate>Vous voulez réserver <i className="font-bold">{serviceName}</i> le{" "}
            {dayOfReservation} à {hourOfReservation} ? </Translate>
          </p>
          <div className="flex w-fit items-center gap-4 ">
            <Popover.Close className="rounded bg-red-500 p-2 px-4 text-white transition-all hover:bg-red-700">
             <Translate>Non</Translate> 
            </Popover.Close>
            <button
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-700 disabled:bg-green-300"
              onClick={idReservation ? modifyReservation : createReservation}
            >
              <Translate>Sauvegarder</Translate> {isLoading && <LoaderIcon />}
            </button>
            
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default AvailableSlot
