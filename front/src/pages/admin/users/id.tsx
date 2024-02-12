import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { UsersWithId } from "@/types/withId"
import { fetchUser } from "@/lib/users"
import { fetchData } from "@/utils/db"
import BackButton from "@/components/ui/BackButton"

const UserIdAdmin = () => {
  const { id } = useParams()
  const [user, setUser] = useState<UsersWithId>()
  useEffect(() => {
    fetchData(
      fetchUser(id || ""),
      setUser as Dispatch<SetStateAction<UsersWithId>>
    )
  }, [])
  if (!user) return <LoaderIcon />

  return (
    <div>
      <BackButton />
      {user.id}
    </div>
  )
}

export default UserIdAdmin
