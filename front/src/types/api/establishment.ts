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
export type EstablishmentPost = {
  name: Establishments["name"]
  address: Establishments["address"]
  zipCode: Establishments["zipCode"]
  city: Establishments["city"]
  country: Establishments["country"]
  lat: Establishments["lat"]
  lng: Establishments["lng"]
  organization: string
}
