export type reduxStatus = "vistitor" | "user" | "practitioner" | "admin"

export type reduxUserFront = {
  email: string
  status: reduxStatus
}
