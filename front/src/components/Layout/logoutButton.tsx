import React from "react"
import { Button } from "@radix-ui/themes"
import { logout } from "@/lib/auth"

const LogoutButton = () => {
  return <Button onClick={logout}>Logout</Button>
}

export default LogoutButton
