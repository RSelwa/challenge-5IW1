import type { SlotsWithId } from "@/types/withId"

export type Users = {
  firstname: string
  lastname: string
  email: string
  slots: SlotsWithId[]
}
