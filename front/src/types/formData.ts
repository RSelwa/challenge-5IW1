export type LoginFormData = { email: string; password: string }
export type SigninUserFormData = {
  email: string
  firstname: string
  lastname: string
  password: string
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
