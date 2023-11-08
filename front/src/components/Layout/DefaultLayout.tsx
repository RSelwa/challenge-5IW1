import React from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"

const DefaultLayout = () => {
  return (
    <div>
      <div className="flex gap-2">
        <Link to="/signin">
          <Button color="amber">Signin</Button>
        </Link>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  )
}

export default DefaultLayout
