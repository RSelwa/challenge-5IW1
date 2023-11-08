import React, { useEffect } from "react"
import { Button, TextField } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import type { DbTableLogin } from "@/types/auth"
import type { LoginFormData } from "@/types/formData"
import { dbTableLogin } from "@/constants/auth"

const LoginWithPassword = () => {
  const navigate = useNavigate()
  const { db } = useParams<{ db: string }>()
  const { handleSubmit, register } = useForm<LoginFormData>()

  useEffect(() => {
    if (!dbTableLogin.includes(db as DbTableLogin)) navigate("/login")
  }, [])

  const handleSubmitText = () => {
    switch (db as DbTableLogin) {
      case "admin":
        return "Login as admin"
      case "practitioner":
        return "Login as practitioner"
      case "users":
        return "Login"
      default:
        return "Login"
    }
  }

  const onSubmit = async (data: LoginFormData) => {
    console.log("try to log on db", db)
    console.log(data)
    await new Promise((r) => setTimeout(r, 2000))
  }

  return (
    <div className="w-10/11 md:w-1/2 mx-auto">
      <form
        onSubmit={handleSubmit((data) =>
          toast.promise(onSubmit(data), {
            success: "logged",
            error: (error) => {
              console.log(error)
              return "Error while login"
            },
            loading: "loading"
          })
        )}
        className="flex flex-col gap-2"
      >
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
        <Button type="submit">{handleSubmitText()}</Button>
      </form>
    </div>
  )
}

export default LoginWithPassword