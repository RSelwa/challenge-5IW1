import React from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import type { SigninOrgaFormData } from "@/types/formData"
import { postOrganization } from "@/lib/organizations"
import { postData } from "@/utils/db"

const SigninOrganizationForm = () => {
  const { handleSubmit, register } = useForm<SigninOrgaFormData>()

  const onSubmit = (data: SigninOrgaFormData) =>
    postData(postOrganization(data))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <input
        required
        placeholder="Organisation's name"
        type="text"
        className="col-span-2"
        {...register("name")}
      />
      <input
        required
        placeholder="Manager firstname"
        type="text"
        {...register("managerFirstname")}
      />
      <input
        required
        placeholder="Manager Lastname"
        type="text"
        {...register("managerLastname")}
      />
      <input
        required
        placeholder="Email"
        className="col-span-2"
        type="email"
        {...register("email")}
      />
      <input
        required
        placeholder="Password"
        type="password"
        className="col-span-2"
        {...register("plainPassword")}
      />
      <input required placeholder="Siret" type="text" {...register("siret")} />
      <label id="label-input-file" htmlFor="kbis">
        KBIS
      </label>
      <input
        required
        type="file"
        // onChange={handleSelectImages}
        {...register("kbisFile")}
        id="kbis"
        className="hidden"
        accept="application/pdf"
      />
      <Button
        className="col-span-2 w-full bg-amber-500 text-neutral-800"
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}

export default SigninOrganizationForm
