import { DbTableLogin } from "@/types/auth"

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
  switch (db as DbTableLogin) {
    case "admin":
      return "admin"
    case "practitioner":
      return "practitioner"
    case "users":
      return "users"
    default:
      return "users"
  }
}
