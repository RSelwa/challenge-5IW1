import React, { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import LogoutButton from "@/components/Layout/logoutButton"
import { Link } from "react-router-dom"

const ClientLayout = () => {
  return (
    <Fragment>
      <DropdownMenu.Item className="DropdownMenuItem">
        <div>users</div>
      </DropdownMenu.Item>
      <DropdownMenu.Item className="DropdownMenuItem">
        <Link to="/profil">My Account</Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item className="DropdownMenuItem">
        <LogoutButton />
      </DropdownMenu.Item>
    </Fragment>
  )
}

export default ClientLayout
