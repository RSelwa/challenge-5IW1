import type { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import type { DbTableLogin } from "@/types/auth"

export const requestOptions = ({
  method,
  data,
  body,
  headers
}: {
  method: "POST" | "GET" | "PATCH"
  headers?: Headers
  data?: any
  body?: BodyInit
}): RequestInit => {
  const newHeader = new Headers()
  newHeader.append("Content-Type", "application/json")
  newHeader.append(
    "Authorization",
    `Bearer ${localStorage.getItem("token")?.replaceAll('"', "") || ""}`
  )
  return {
    method: method,
    body: body ? body : data ? JSON.stringify(data) : undefined,
    headers: headers ? headers : newHeader
  }
}
export const formDataHeader = (data: any) => {
  const headers = new Headers()
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof FileList) {
      formData.append(key, (value as FileList)[0])
    } else {
      formData.append(key, value as string)
    }
  }

  return { headers, formData }
}
export const fetchData = async <T>(
  promise: Promise<T>,
  setter: Dispatch<SetStateAction<T>> | Dispatch<SetStateAction<T>>[]
) => {
  toast.promise(promise, {
    error: (err) => {
      console.trace(err)
      return "Erreur"
    },
    loading: "Chargement en cours...",
    success: (dataFetched) => {
      if (Array.isArray(setter)) {
        setter.forEach((s) => s(dataFetched))
      } else {
        setter(dataFetched)
      }
      return "Chargement terminé"
    }
  })
}
export const postData = async <T>(promise: Promise<T>) => {
  toast.promise(promise, {
    error: (err) => {
      console.trace(err)
      return "Erreur"
    },
    loading: "Chargement en cours...",
    success: "Chargement terminé"
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
