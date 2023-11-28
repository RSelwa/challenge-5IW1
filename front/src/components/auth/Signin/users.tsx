import React from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { SigninUserFormData } from "@/types/formData"
import { handleCorrespondingDb } from "@/utils/db"

const SigninUsers = () => {
  const { db } = useParams<{ db: string }>()
  const { handleSubmit, register, setValue } = useForm<SigninUserFormData>({
    defaultValues: { terms: false }
  })

  const onSubmit = async (data: SigninUserFormData) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${handleCorrespondingDb(db || "")}`,
      requestOptions
    )
    if (!response.ok) throw new Error("Something went wrong")

    const responseData = await response.json()
    console.log(responseData)
  }

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit((data) =>
          toast.promise(onSubmit(data), {
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
          {...register("password")}
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
