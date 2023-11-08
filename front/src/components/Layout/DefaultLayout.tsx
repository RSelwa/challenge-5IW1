import React from "react"
import { Link } from "react-router-dom"

const DefaultLayout = () => {
  return (
    <div>
      {" "}
      <div className="flex gap-2">
        <Link to="/">Home</Link>
        <Link to="/planning">Planning</Link>
        <Link to="/signin">Signin</Link>
      </div>
    </div>
  )
}

export default DefaultLayout
