import React from "react"
import { Button } from "@radix-ui/themes"
import { logout } from "@/lib/auth"

const ClientLayout = () => {
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default ClientLayout
