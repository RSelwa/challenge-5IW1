import React, { useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "react-hot-toast"
import { ORGANIZATION_API_ROUTES } from "@/constants/db"
import { requestOptions } from "@/utils/db"

const FormPostOrganisation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register } = useForm()

  const postData = async (data: any) => {
    try {
      setIsLoading(true)
      const newHeader = new Headers()
      newHeader.append("Content-Type", "application/json")
      newHeader.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")?.replaceAll('"', "") || ""}`
      )
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${ORGANIZATION_API_ROUTES}`,
        requestOptions({
          method: "POST",
          headers: newHeader,
          body: data
        })
      )
      if (!response.ok) throw new Error("Something went wrong")
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  //   "name": "string",
  //   "managerFirstname": "string",
  //   "managerLastname": "string",
  //   "kbisFile": "string",
  //   "siret": "string",
  //   "email": "string",
  //   "plainPassword": "string"
  return (
    <form onSubmit={handleSubmit(postData)}>
      <fieldset>
        <label htmlFor="employee">
          <Translate>Nom</Translate>
        </label>
        <input type="text" {...register("name")} />
      </fieldset>
      <fieldset>
        <label htmlFor="managerFirstname">
          <Translate>Prénom Manager</Translate>
        </label>
        <input type="text" {...register("managerFirstname")} />
      </fieldset>
      <fieldset>
        <label htmlFor="managerLastname">
          <Translate>Nom Manager</Translate>
        </label>
        <input type="text" {...register("managerLastname")} />
      </fieldset>
      <fieldset>
        <label htmlFor="kbisFile">
          <Translate>Kbis</Translate>
        </label>
        <input type="file" accept="application/pdf" {...register("kbisFile")} />
      </fieldset>
      <fieldset>
        <label htmlFor="siret">
          <Translate>Siret</Translate>
        </label>
        <input type="text" {...register("siret")} />
      </fieldset>
      <fieldset>
        <label htmlFor="email">
          <Translate>Email</Translate>
        </label>
        <input type="email" {...register("email")} />
      </fieldset>
      <fieldset>
        <label htmlFor="plainPassword">
          <Translate>Mot de passe</Translate>
        </label>
        <input type="password" {...register("plainPassword")} />
      </fieldset>

      <button
        type="submit"
        disabled={isLoading}
        className=" flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white"
      >
        <Translate>Ajouter</Translate>
        {isLoading && <LoaderIcon />}
      </button>
    </form>
  )
}

export default FormPostOrganisation
