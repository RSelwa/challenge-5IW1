import React from "react"
import { Button } from "@radix-ui/themes"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { SigninOrgaFormData } from "@/types/formData"
import type { EmailType } from "@/types/mail"
import { postEmail } from "@/lib/mail"
import { postOrganization } from "@/lib/organizations"

const SigninOrganizationForm = () => {
  const { handleSubmit, register } = useForm<SigninOrgaFormData>()
  const navigate = useNavigate()
  const onSubmit = async (data: SigninOrgaFormData) => {
    try {
      await postOrganization(data)
      const emailData: EmailType = {
        to: "admin-test@yopmail.com",
        subject: "Nouvelle inscription à valider",
        body: `Une nouvelle organisation "${data.name}" demande à être validée. Veuillez vous connecter à votre panel administrateur pour effectuer la validation.`
      }
      navigate("/login")
      await postEmail(emailData)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <input
        required
        placeholder="Nom de l'organisation"
        type="text"
        className="col-span-2"
        {...register("name")}
      />
      <input
        required
        placeholder="Prénom du manager"
        type="text"
        {...register("managerFirstname")}
      />
      <input
        required
        placeholder="Nom du manager"
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
        placeholder="Mot de passe"
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
        className="col-span-2 w-full bg-amber-500 font-bold text-white transition-colors hover:bg-amber-700"
        type="submit"
      >
        <Translate>Envoyer </Translate>
      </Button>
    </form>
  )
}

export default SigninOrganizationForm
