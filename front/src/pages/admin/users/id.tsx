import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { UsersWithId } from "@/types/withId"
import { fetchUser } from "@/lib/users"
import BackButton from "@/components/ui/BackButton"

const UserIdAdmin = () => {
  const { id } = useParams()
  const [user, setUser] = useState<UsersWithId>()
  const fetchUsersList = async () =>
    toast.promise(fetchUser(id || ""), {
      error: (err) => {
        return err
      },
      loading: "fetching users...",
      success: (userFetch) => {
        setUser(userFetch)
        console.log(userFetch)
        console.log(user)

        return "fetcheds"
      }
    })

  useEffect(() => {
    fetchUsersList()
  }, [])
  return (
    <div>
      <BackButton />
      UsersAdmin
    </div>
  )
}

export default UserIdAdmin
