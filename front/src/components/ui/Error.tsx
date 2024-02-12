import React from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"

const Error = () => {
  return (
    <div className="mx-auto mt-24 flex w-1/2 flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-black text-red-500">
        Une erreur est survenue
      </h1>
      <Link to="/">
        <Button className="hover:bg-blue-700">Revenir à l'accueil</Button>
      </Link>
    </div>
  )
}

export default Error
