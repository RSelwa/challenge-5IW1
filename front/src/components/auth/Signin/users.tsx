import React from "react"
import { Button } from "@radix-ui/themes"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import type { SigninUserFormData } from "@/types/formData"
import { signInUser } from "@/lib/auth"

const SigninUsers = () => {
  const { handleSubmit, register } = useForm<SigninUserFormData>()

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit((data) =>
          toast.promise(signInUser(data), {
            success: "Vous voilà inscrit",
            error: (error) => {
              console.log(error)
              return "Error while login"
            },
            loading: "loading"
          })
        )}
      >
        <input
          className="col-span-2"
          placeholder="Email"
          type="email"
          {...register("email")}
        />
        <input placeholder="Firstname" type="text" {...register("firstname")} />
        <input placeholder="lastname" type="text" {...register("lastname")} />
        <input
          className="col-span-2"
          placeholder="Mot de passe"
          type="password"
          {...register("plainPassword")}
        />
        <Button
          type="submit"
          color="amber"
          className="col-span-2 w-full bg-amber-400 font-bold capitalize text-neutral-800 hover:bg-amber-500"
        >
          <Translate>S'enregistrer</Translate>
        </Button>
      </form>
    </div>
  )
}

export default SigninUsers
