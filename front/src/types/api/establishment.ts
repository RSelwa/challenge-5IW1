import type { EmployeesWithId } from "../withId"

export type Establishments = {
  name: string
  address: string
  zipCode: string
  city: string
  country: string
  employees: EmployeesWithId[]
  lat: number
  lng: number
}
