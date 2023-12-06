import React, { useEffect, useState } from "react"
import type { UsersWithId } from "@/types/withId"
import { usersHeader } from "@/constants/tableHeaders"
import { fetchUsers } from "@/lib/users"
import { fetchData } from "@/utils/db"
import UsersRowsAdmin from "@/components/Rows/admin/UsersRows"
import Table from "@/components/Table"

const UsersAdmin = () => {
  const [users, setUsers] = useState<UsersWithId[]>([])

  useEffect(() => {
    fetchData(fetchUsers(), setUsers)
  }, [])

  return <Table header={usersHeader} Rows={UsersRowsAdmin} dataT={users} />
}

export default UsersAdmin
