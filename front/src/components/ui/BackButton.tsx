import React from "react"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button color="amber" onClick={() => navigate(-1)}>
      <ArrowLeftIcon color="white" strokeWidth={3} />
    </Button>
  )
}

export default BackButton
