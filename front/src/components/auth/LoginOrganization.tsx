import React from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
// import type { DbTableLogin } from "@/types/auth"
import type { LoginFormData } from "@/types/formData"
import { loginOrganization } from "@/lib/auth"
//import { loginOrganization } from "@/lib/auth"
import { handleSubmitTextDb } from "@/utils/db"

const LoginOrga = () => {
  const navigate = useNavigate()
  const { db } = useParams<{ db: string }>()
  const { handleSubmit, register } = useForm<LoginFormData>()

  //   useEffect(() => {
  //     if (!dbTableLogin.includes(db as DbTableLogin)) navigate("/login")
  //   }, [])

  return (
    <div className="w-10/11 mx-auto md:w-1/2">
      <form
        onSubmit={handleSubmit((data) =>
          toast.promise(loginOrganization(data), {
            success: () => {
              // navigate("/")
              return "logged"
            },
            error: (error) => {
              console.trace(error)
              return "Error while login"
            },
            loading: "loading"
          })
        )}
        className="flex flex-col gap-2"
      >
        <input placeholder="Email" type="email" {...register("email")} />
        <input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <Button
          className="bg-amber-500 font-bold text-neutral-800"
          type="submit"
        >
          {handleSubmitTextDb(db || "")}
        </Button>
      </form>
    </div>
  )
}

export default LoginOrga
