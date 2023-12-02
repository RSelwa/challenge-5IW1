import React from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"

const VisitorLayout = () => {
  return (
    <div>
      <div className="flex gap-2">
        <Link to="/login/admin">
          <Button color="amber">Login as Admin</Button>
        </Link>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  )
}

export default VisitorLayout
