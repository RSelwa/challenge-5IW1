import React, { useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import type { UsersWithId } from "@/types/withId"
import { usersHeader } from "@/constants/tableHeaders"
import { fetchUsers } from "@/lib/users"
import { fetchData } from "@/utils/db"
import Table from "@/components/Table"

const UsersAdmin = () => {
  const [users, setUsers] = useState<UsersWithId[]>([])

  useEffect(() => {
    fetchData(fetchUsers(), setUsers)
  }, [])

  return (
    <div>
      <Table header={usersHeader} rows={<div>row</div>} dataT={users} />
      {/* {users.map((user, index) => (
        <div key={index}>
          {user.email}
          {user.id}
          <Link to={`/admin/users/${user.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      ))} */}
    </div>
  )
}

export default UsersAdmin
