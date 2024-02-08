import React from "react"
import { Button } from "@radix-ui/themes"
import { logout } from "@/lib/auth"
import { Translate } from "react-auto-translate"


const LogoutButton = () => {
  return <Button onClick={logout}><Translate>Déconnexion</Translate></Button>
}

export default LogoutButton
