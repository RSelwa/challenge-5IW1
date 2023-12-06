import React from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"

const VisitorHome = () => {
  return (
    <div className="mt-14 text-center ">
      <h1 className="text-[4rem] font-black italic">Doctoges</h1>
      <Link to="/login">
        <Button className="mt-14 rounded-full px-8">Login</Button>
      </Link>
    </div>
  )
}

export default VisitorHome
