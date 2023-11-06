import React from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import Input from "../ui/Input"

type Props = {}

const LoginWithPassword = (props: Props) => {
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

export default LoginWithPassword
