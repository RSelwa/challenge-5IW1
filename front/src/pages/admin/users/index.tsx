import React, { useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import type { UsersWithId } from "@/types/withId"
import { fetchUsers } from "@/lib/users"

const UsersAdmin = () => {
  const [users, setUsers] = useState<UsersWithId[]>([])
  const fetchUsersList = async () => {
    console.log("test")

    toast.promise(fetchUsers(), {
      error: (err) => {
        return err
      },
      loading: "fetching users...",
      success: (usersFetch) => {
        setUsers(usersFetch)
        return "fetcheds"
      }
    })
  }
  useEffect(() => {
    fetchUsersList()
  }, [])

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          {user.email}
          {user.id}
          <Link to={`/admin/users/${user.id}`}>
            {" "}
            <Button>View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default UsersAdmin
