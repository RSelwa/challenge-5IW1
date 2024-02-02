import React, { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import { parseJwt } from "@/utils/redux"
import LogoutButton from "@/components/Layout/logoutButton"

const ClientLayout = () => {
  const { id } = parseJwt(localStorage.getItem("token") || "")

  return (
    <Fragment>
      <DropdownMenu.Item className="DropdownMenuItem">
        <Link to={`/reservations/${id}`}>Mes réservations</Link>
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
