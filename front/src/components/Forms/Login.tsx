import React from "react"
import { Button, TextField } from "@radix-ui/themes"
import { useForm } from "react-hook-form"

const LoginWithPassword = () => {
  type FormData = { email: string; password: string }
  const { handleSubmit, register } = useForm<FormData>()
  const onSubmit = (data: FormData) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField.Input
        id="email"
        placeholder="Email"
        type="email"
        {...register("email")}
      />
      <TextField.Input
        id="password"
        placeholder="Password"
        type="password"
        {...register("password")}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default LoginWithPassword
