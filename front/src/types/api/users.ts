import type { SlotsWithId } from "@/types/withId"

export type Users = {
  firstname: string
  lastname: string
  email: string
  slots: SlotsWithId[]
}

// export type EditUser = {
//   firstname: string
//   lastname: string
//   email: string
// }