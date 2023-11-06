import React from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import Input from "../../ui/Input"

type FormData = {
  email: string
  password: string
  kbis: FileList
}
const SigninEntreprises = () => {
  const { handleSubmit, register } = useForm<FormData>()
  const onSubmit = (data: FormData) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        label="Email"
        name="email"
        placeholder="Email"
        type="email"
        variant="outline"
        stateRegister="email"
        register={register}
      />
      <Input
        accept="application/pdf"
        id="kbis"
        label="Kbis"
        name="kbis"
        placeholder="Kbis"
        type="file"
        variant="outline"
        stateRegister="kbis"
        register={register}
      />
      <Input
        id="password"
        label="Password"
        name="password"
        placeholder="Password"
        type="password"
        variant="outline"
        stateRegister="password"
        register={register}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default SigninEntreprises
