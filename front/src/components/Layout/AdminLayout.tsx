import React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import LogoutButton from "@/components/Layout/logoutButton"

const AdminLayout = () => {
  return (
    <DropdownMenu.Content className="DropdownMenuContent text-red-500">
      <DropdownMenu.Item className="DropdownMenuItem">
        Admin layout
      </DropdownMenu.Item>
      <DropdownMenu.Item className="DropdownMenuItem">
        <LogoutButton />
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  )
}

export default AdminLayout
