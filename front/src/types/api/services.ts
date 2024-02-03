import type { EmployeesWithId, SlotsWithId } from "@/types/withId"

export type Services = {
  name: string
  duration: number
  price: number
  employee: EmployeesWithId
  slots: SlotsWithId[]
}
