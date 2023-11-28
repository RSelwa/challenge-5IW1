import React, { ChangeEvent } from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import { SigninOrgaFormData } from "@/types/formData"
import { getImageUrlFromBlob } from "@/utils/file"

const SigninEntreprises = () => {
  const { handleSubmit, register, setValue } = useForm<SigninOrgaFormData>()
  const handleSelectImages = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      console.log("eereee")

      const file = Array.from(event.target.files || [])[0]
      const urlKbis = await getImageUrlFromBlob(file)
      setValue("kbisFile", urlKbis as string)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = (data: SigninOrgaFormData) => console.log(data)
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
        onChange={handleSelectImages}
        id="kbis"
        className="hidden"
        accept="application/pdf"
        // {...register("kbisFile")}
      />
      <Button color="amber" className="col-span-2 w-full" type="submit">
        Submit
      </Button>
    </form>
  )
}

export default SigninEntreprises
