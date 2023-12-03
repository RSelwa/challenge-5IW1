import type { SlotsWithId } from "@/types/withId"
import { requestOptions } from "@/utils/db"

export const fetchSlots = async (): Promise<SlotsWithId[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/slots`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const slots: SlotsWithId[] = await response.json()
  return slots
}
export const fetchSlot = async (id: string): Promise<SlotsWithId> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/slots/${id}`,
    requestOptions("GET")
  )
  if (!response.ok) throw new Error("Something went wrong")

  const slot: SlotsWithId = await response.json()
  return slot
}
