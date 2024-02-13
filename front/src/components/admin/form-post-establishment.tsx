import React, { useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "react-hot-toast"
import { ESTABLISHMENT_API_ROUTES } from "@/constants/db"

const FormPostEstablishment = () => {
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
        `${import.meta.env.VITE_API_URL}${ESTABLISHMENT_API_ROUTES}`,

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
        <label htmlFor="name">
          <Translate>Nom</Translate>
        </label>
        <input type="text" {...register("name")} />
      </fieldset>
      <fieldset>
        <label htmlFor="address">
          <Translate>Adresse</Translate>
        </label>
        <input type="text" {...register("address")} />
      </fieldset>
      <fieldset>
        <label htmlFor="zipCode">
          <Translate>Code postal</Translate>
        </label>
        <input type="text" {...register("zipCode")} />
      </fieldset>
      <fieldset>
        <label htmlFor="city">
          <Translate>Ville</Translate>
        </label>
        <input type="text" {...register("city")} />
      </fieldset>
      <fieldset>
        <label htmlFor="country">
          <Translate>Pays</Translate>
        </label>
        <input type="text" {...register("country")} />
      </fieldset>
      <fieldset>
        <label htmlFor="organization">
          <Translate>Organisation</Translate>
        </label>
        <input type="text" {...register("organization")} />
      </fieldset>
      <fieldset>
        <label htmlFor="lat">
          <Translate>Latitude</Translate>
        </label>
        <input type="number" {...register("lat", { valueAsNumber: true })} />
      </fieldset>
      <fieldset>
        <label htmlFor="lng">
          <Translate>Longitude</Translate>
        </label>
        <input type="number" {...register("lng", { valueAsNumber: true })} />
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

export default FormPostEstablishment
