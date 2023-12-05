import React, { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Link } from "react-router-dom"
import LogoutButton from "@/components/Layout/logoutButton"
import { adminRoutes } from "@/routes"

const AdminLayout = () => {
  return (
    <Fragment>
      <DropdownMenu.Item className="DropdownMenuItem">
        Admin layout
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="DropdownMenuSeparator" />
      {adminRoutes
        .filter((route) => !route.path?.includes(":id"))
        .map((route, index) => (
          <DropdownMenu.Item key={index} className="DropdownMenuItem">
            <Link to={route.path || ""}>
              {route.path?.replace("/admin/", "")}{" "}
            </Link>
          </DropdownMenu.Item>
        ))}
      <DropdownMenu.Separator className="DropdownMenuSeparator" />
      <DropdownMenu.Item className="DropdownMenuItem">
        <LogoutButton />
      </DropdownMenu.Item>
    </Fragment>
  )
}

export default AdminLayout
