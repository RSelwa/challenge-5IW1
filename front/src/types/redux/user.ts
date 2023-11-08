export type reduxStatus = "vistitor" | "client" | "practitioner" | "admin"

export type reduxUserFront = {
  email: string
  status: reduxStatus
}
