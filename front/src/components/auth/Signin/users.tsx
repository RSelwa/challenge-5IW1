import React from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import type { SigninUserFormData } from "@/types/formData"
import { signInUser } from "@/lib/auth"

const SigninUsers = () => {
  const { handleSubmit, register, setValue } = useForm<SigninUserFormData>()

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
          placeholder="Password"
          type="password"
          {...register("plainPassword")}
        />
        <div className="col-span-2 flex items-center gap-4 text-neutral-800">
          <Checkbox.Root
            className="CheckboxRoot"
            onCheckedChange={(checked) =>
              setValue("terms", checked === "indeterminate" ? false : checked)
            }
            id="terms"
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="terms">
            Accept terms and conditions.
          </label>
        </div>
        <Button
          type="submit"
          color="amber"
          className="col-span-2 w-full bg-amber-400 font-bold capitalize text-neutral-800 hover:bg-amber-500"
        >
          S'inscrire
        </Button>
      </form>
    </div>
  )
}

export default SigninUsers
