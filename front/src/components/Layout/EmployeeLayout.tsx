import React, { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Translate } from "react-auto-translate"
import { Link } from "react-router-dom"
import { parseJwt } from "@/utils/redux"
import LogoutButton from "@/components/Layout/logoutButton"

const EmployeeLayout = () => {
  const { id } = parseJwt(localStorage.getItem("token") || "")
  return (
    <Fragment>
      <DropdownMenu.Item className="DropdownMenuItem">
        <Link to={`/my-services/${id}`}>
          <Translate>Mes services</Translate>
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item className="DropdownMenuItem">
        <Link to={`/my-specific-schedule/${id}`}>
          <Translate>Mes conges</Translate>
        </Link>
      </DropdownMenu.Item>

      <DropdownMenu.Item className="DropdownMenuItem">
        <Link to={`/reservation-history/${id || ""}`}>
          <Translate>Historique des reservations</Translate>
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item className="DropdownMenuItem">
        <LogoutButton />
      </DropdownMenu.Item>
    </Fragment>
  )
}

export default EmployeeLayout
