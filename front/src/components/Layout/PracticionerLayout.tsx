import React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import LogoutButton from "@/components/Layout/logoutButton"

const PracticionerLayout = () => {
  return (
    <DropdownMenu.Content className="DropdownMenuContent text-red-500">
      <DropdownMenu.Item className="DropdownMenuItem">
        Practicien layout
      </DropdownMenu.Item>
      <DropdownMenu.Item className="DropdownMenuItem">
        <LogoutButton />
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  )
}

export default PracticionerLayout
