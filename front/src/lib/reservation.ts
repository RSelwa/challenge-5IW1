import type { Reservation } from "@/types/api/reservations"
import { RESERVATION_API_ROUTES } from "@/constants/db"
import { formDataHeader, requestOptions } from "@/utils/db"

export const postReservation = async (reservation: Reservation) => {
  const { headers, formData } = formDataHeader(reservation)

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${RESERVATION_API_ROUTES}`,
    requestOptions({
      method: "POST",
      headers,
      body: formData
    })
  )
  if (!response.ok) throw new Error("Something went wrong")
  console.log(response)
}
