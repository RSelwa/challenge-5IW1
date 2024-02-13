import React, { useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "react-hot-toast"
import { EMPLOYEE_API_ROUTES } from "@/constants/db"

const FormPostEmployee = () => {
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
        `${import.meta.env.VITE_API_URL}${EMPLOYEE_API_ROUTES}`,

        {
          method: "POST",
          body: JSON.stringify(data),
          headers: newHeader
        }
      )
      if (!response.ok) throw new Error("Something went wrong")
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(postData)}>
      <fieldset>
        <label htmlFor="category">
          <Translate>Catégorie</Translate>
        </label>
        <input type="text" {...register("category")} />
      </fieldset>
      <fieldset>
        <label htmlFor="firstname">
          <Translate>Prénom</Translate>
        </label>
        <input type="text" {...register("firstname")} />
      </fieldset>
      <fieldset>
        <label htmlFor="lastname">
          <Translate>Nom</Translate>
        </label>
        <input type="text" {...register("lastname")} />
      </fieldset>
      <fieldset>
        <label htmlFor="establishment">
          <Translate>Etablissement</Translate>
        </label>
        <input type="text" {...register("establishment")} />
      </fieldset>
      <fieldset>
        <label htmlFor="email">
          <Translate>Email"</Translate>
        </label>
        <input type="email" {...register("email")} />
      </fieldset>
      <fieldset>
        <label htmlFor="plainPassword">
          <Translate>Mot de passe"</Translate>
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

export default FormPostEmployee
