import React from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"

type FormData = {
  email: string
  password: string
  kbis: FileList
}
const SigninEntreprises = () => {
  const { handleSubmit } = useForm<FormData>()
  const onSubmit = (data: FormData) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default SigninEntreprises
