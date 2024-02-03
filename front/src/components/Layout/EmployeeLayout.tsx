import React, { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import LogoutButton from "@/components/Layout/logoutButton"

const EmployeeLayout = () => {
  return (
    <Fragment>
      <DropdownMenu.Item className="DropdownMenuItem">
        <div>employee layout</div>
      </DropdownMenu.Item>
      <DropdownMenu.Item className="DropdownMenuItem">
        <LogoutButton />
      </DropdownMenu.Item>
    </Fragment>
  )
}

export default EmployeeLayout
