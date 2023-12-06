import React from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"

const AdminViewDetails = ({ id }: { id: string }) => {
  return (
    <Link to={`${window.location.pathname}/${id}`}>
      <Button>Voir</Button>
    </Link>
  )
}

export default AdminViewDetails
