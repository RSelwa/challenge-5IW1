import React, { useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "react-hot-toast"
import { SLOT_API_ROUTES } from "@/constants/db"

const FormPostSlot = () => {
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
        `${import.meta.env.VITE_API_URL}${SLOT_API_ROUTES}`,

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
        <label htmlFor="user">
          <Translate>Utilisateur</Translate>
        </label>
        <input type="text" {...register("user")} />
      </fieldset>
      <fieldset>
        <label htmlFor="startTime">
          <Translate>Début</Translate>
        </label>
        <input
          type="text"
          {...register("startTime", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="duration">
          <Translate>Durée</Translate>
        </label>
        <input
          type="number"
          {...register("duration", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="status">
          <Translate>Statut</Translate>
        </label>
        <input type="number" {...register("status")} />
      </fieldset>
      <fieldset>
        <label htmlFor="service">
          <Translate>Service</Translate>
        </label>
        <input type="text" {...register("service")} />
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

export default FormPostSlot
