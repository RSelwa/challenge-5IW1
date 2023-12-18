import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { UsersWithId } from "@/types/withId"
import { editUser, fetchUser } from "@/lib/users"
import { fetchData } from "@/utils/db"
import Edit from "@/components/admin/Edit"
import BackButton from "@/components/ui/BackButton"

const UserEdit = () => {
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
      <Edit onSubmit={editUser} data={user} />
    </div>
  )
}

export default UserEdit
