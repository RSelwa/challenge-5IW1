import React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import LogoutButton from "@/components/Layout/logoutButton"
import { dropdownMenuSideOffset } from "@/constants"

const AdminLayout = () => {
  return (
    <DropdownMenu.Content
      sideOffset={dropdownMenuSideOffset}
      className="DropdownMenuContent text-red-500"
    >
      <DropdownMenu.Item className="DropdownMenuItem">
        Admin layout
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="DropdownMenuSeparator" />
      <DropdownMenu.Item className="DropdownMenuItem">
        <Link to="/admin/users">users </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="DropdownMenuSeparator" />
      <DropdownMenu.Item className="DropdownMenuItem">
        <LogoutButton />
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  )
}

export default AdminLayout
