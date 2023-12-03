import type { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import type { DbTableLogin } from "@/types/auth"

export const requestOptions = ({
  method,
  data
}: {
  method: "POST" | "GET"
  data?: any
}) => {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  return {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers
  }
}

export const fetchData = async <T>(
  promise: Promise<T>,
  setter: Dispatch<SetStateAction<T>>
) => {
  toast.promise(promise, {
    error: (err) => {
      console.trace(err)
      return "error"
    },
    loading: "fetching...",
    success: (dataFetched) => {
      setter(dataFetched)
      return "fetched"
    }
  })
}

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
