import type { Dispatch, SetStateAction } from "react"
import type { Slots, SlotsStatus } from "@/types/api/slots"
import type { SlotsWithId } from "@/types/withId"
import { SLOT_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

export const fetchSlots = async (): Promise<SlotsWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${SLOT_API_ROUTES}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const slots: SlotsWithId[] = await response.json()
  return slots
}
export const fetchSlot = async (id: string): Promise<SlotsWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${SLOT_API_ROUTES}/${id}`,
    requestOptions({ method: "GET" })
  )
  if (!response.ok) throw new Error("Something went wrong")

  const slot: SlotsWithId = await response.json()
  return slot
}
export const editSlot = async (slot: SlotsWithId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${SLOT_API_ROUTES}/${slot.id}`,
      requestOptions({
        method: "PATCH",
        body: JSON.stringify({
          ...slot,
          startTime: new Date(slot.startTime).getTime() / 1000
        })
      })
    )
    if (!response.ok) throw new Error("Something went wrong")
  } catch (error) {
    console.error(error)
  }
}
export const postSlot = async (slot: Slots) => {
  const newHeader = new Headers()
  newHeader.append("Content-Type", "application/json")
  newHeader.append(
    "Authorization",
    `Bearer ${localStorage.getItem("token")?.replaceAll('"', "") || ""}`
  )
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${SLOT_API_ROUTES}`,
    {
      method: "POST",
      body: JSON.stringify({
        ...slot,
        startTime: new Date(slot.startTime).getTime() / 1000
      }),
      headers: newHeader
    }
  )
  if (!response.ok) throw new Error("Something went wrong")
  // const orga = await response.json()
}

export const changeReservationStatus = async (
  id: string,
  status: SlotsStatus,
  callBack: () => void,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  setIsLoading(true)
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${SLOT_API_ROUTES}/${id}`,
      requestOptions({
        method: "PATCH",
        body: JSON.stringify({ status: status })
      })
    )

    if (!response.ok) throw new Error("Something went wrong")
    callBack()
  } catch (error) {
    console.error(error)
  }
  setIsLoading(false)
}
