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
import { Services } from "@/types/api/services"
import { fetchService } from "@/lib/services"
import { EmailType } from "@/types/mail"
import { postEmail } from "@/lib/mail"

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

      const serviceDetails = await fetchService(serviceId);
      const employeeEmail = serviceDetails.employee.email;
  
      const emailData: EmailType = {
        to: employeeEmail,
        subject: `Nouvelle réservation de ${serviceName}`,
        body: `Bonjour,\n\nVous avez une nouvelle réservation pour le service "${serviceName}" le ${dayOfReservation} à ${hourOfReservation}.\n\nCordialement,`,
      };
  
     
      
      await postEmail(emailData);
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
            Vous voulez réserver <i className="font-bold">{serviceName}</i> le{" "}
            {dayOfReservation} à {hourOfReservation} ?
          </p>
          <div className="flex w-fit items-center gap-4 ">
            <Popover.Close className="rounded bg-red-500 p-2 px-4 text-white transition-all hover:bg-red-700">
              Non
            </Popover.Close>
            <button
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-700 disabled:bg-green-300"
              onClick={idReservation ? modifyReservation : createReservation}
            >
              Save {isLoading && <LoaderIcon />}
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default AvailableSlot
