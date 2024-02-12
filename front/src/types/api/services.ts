import type { EmployeesWithId, SlotsWithId } from "@/types/withId"

export type Services = {
  name: string
  duration: number
  price: number
  employee: EmployeesWithId
  slots: SlotsWithId[]
}

export type PostService = {
  name: string
  duration: number
  employee: string
  price: number
  slots: string[]
}
