import type { DbTableLogin } from "@/types/auth"

export const handleSubmitTextDb = (db: string) => {
  switch (db as DbTableLogin) {
    case "admin":
      return "Login as admin"
    case "practitioner":
      return "Login as practitioner"
    case "users":
      return "Login"
    default:
      return "Login"
  }
}
export const handleCorrespondingDb = (db: string) => {
  switch (db) {
    case "admin":
      return "admin"
    case "organizations":
      return "organizations"
    case "practitioner":
      return "practitioner"
    case "users":
      return "user"
    default:
      return "user"
  }
}
