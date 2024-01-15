import { SlotsWithId } from "./withId";

export type LoginFormData = { email: string; password: string }
export type SigninUserFormData = {
  email: string
  firstname: string
  lastname: string
  plainPassword: string
  terms: boolean
}

export type SigninOrgaFormData = {
  name: string
  managerFirstname: string
  managerLastname: string
  kbisFile: string
  siret: string
  email: string
  plainPassword: string
}

export type UserInfosProfileFormData = {
  firstname: string
  lastname: string
  email: string 
}