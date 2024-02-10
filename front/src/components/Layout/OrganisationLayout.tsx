import React, { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Translate } from "react-auto-translate"
import { Link } from "react-router-dom"
import LogoutButton from "@/components/Layout/logoutButton"

const OrganisationLayout = () => {
  return (
    <Fragment>
      <DropdownMenu.Item className="cursor-pointer rounded px-4 py-1 text-amber-500 hover:bg-gray-200">
        <Link to="/mon-organisation">
          <Translate>Mon organisation</Translate>
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item className="cursor-pointer rounded px-4 py-1 text-amber-500 hover:bg-gray-200">
        <LogoutButton />
      </DropdownMenu.Item>
    </Fragment>
  )
}

export default OrganisationLayout
