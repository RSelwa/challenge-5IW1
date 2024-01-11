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
      requestOptions({ method: "PATCH", body: JSON.stringify(slot) })
    )
    if (!response.ok) throw new Error("Something went wrong")
  } catch (error) {
    console.error(error)
  }
}
