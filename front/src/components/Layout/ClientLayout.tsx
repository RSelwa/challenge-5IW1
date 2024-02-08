import React, { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import { parseJwt } from "@/utils/redux"
import LogoutButton from "@/components/Layout/logoutButton"
import { Translate } from "react-auto-translate"


const ClientLayout = () => {
  const { id } = parseJwt(localStorage.getItem("token") || "")

  return (
    <Fragment>
      <DropdownMenu.Item className="cursor-pointer rounded px-4 py-1 text-cyan-500 hover:bg-gray-200">
        <Link to={`/reservations/${id}`}><Translate>Mes réservations</Translate></Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item className="cursor-pointer rounded px-4 py-1 text-cyan-500 hover:bg-gray-200">
        <Link to="/profil"><Translate>Mon compte</Translate></Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item className="cursor-pointer rounded px-4 py-1 text-cyan-500 hover:bg-gray-200">
        <LogoutButton />
      </DropdownMenu.Item>
    </Fragment>
  )
}

export default ClientLayout
