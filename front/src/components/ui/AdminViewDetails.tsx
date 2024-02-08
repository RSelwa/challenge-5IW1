import React from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"
import { Translate } from "react-auto-translate"


const AdminViewDetails = ({ id }: { id: string }) => {
  return (
    <Link to={`${window.location.pathname}/${id}`}>
      <Button><Translate>Voir</Translate></Button>
    </Link>
  )
}

export default AdminViewDetails
