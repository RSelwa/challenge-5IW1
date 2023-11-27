import React, { useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { Button, TextField } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { SigninUserFormData } from "@/types/formData"
import { handleCorrespondingDb } from "@/utils/db"

const SigninUsers = () => {
  const { db } = useParams<{ db: string }>()
  const { handleSubmit, register } = useForm<SigninUserFormData>()
  const [termsChecked, setTermsChecked] = useState(false)
  const onSubmit = async (data: SigninUserFormData) => {
    console.log("try to log on db", handleCorrespondingDb(db || ""))
    console.log(data)
    await new Promise((r) => setTimeout(r, 2000))
  }
  return (
    <div>
      <form
        className="flex flex-col gap-4"
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
        <TextField.Input
          placeholder="Email"
          type="email"
          {...register("email")}
        />
        <TextField.Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <div className="flex items-center gap-4 text-neutral-800">
          <Checkbox.Root
            className="CheckboxRoot"
            checked={termsChecked}
            onCheckedChange={(checked) =>
              setTermsChecked(checked === "indeterminate" ? false : checked)
            }
            id="c1"
          >
            <Checkbox.Indicator className="CheckboxIndicator">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className="Label" htmlFor="c1">
            Accept terms and conditions.
          </label>
        </div>
        <Button
          type="submit"
          className="w-full bg-amber-400 font-bold text-neutral-800 hover:bg-amber-500"
        >
          S'inscrire
        </Button>
      </form>
    </div>
  )
}

export default SigninUsers
