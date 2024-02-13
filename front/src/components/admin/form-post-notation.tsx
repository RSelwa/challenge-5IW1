import React, { useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "react-hot-toast"
import { NOTATION_API_ROUTES } from "@/constants/db"

const FormPostNotation = () => {
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
        `${import.meta.env.VITE_API_URL}${NOTATION_API_ROUTES}`,

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
  //   "note": 0,
  //   "comment": "string",
  //   "idNotationTarget": "string",
  //   "idNotationFrom": "string"
  return (
    <form onSubmit={handleSubmit(postData)}>
      <fieldset>
        <label htmlFor="note">
          <Translate>Note</Translate>
        </label>
        <input type="number" {...register("note", { valueAsNumber: true })} />
      </fieldset>
      <fieldset>
        <label htmlFor="comment">
          <Translate>Commentaire</Translate>
        </label>
        <input type="text" {...register("comment")} />
      </fieldset>
      <fieldset>
        <label htmlFor="idNotationTarget">
          <Translate>Employé</Translate>
        </label>
        <input type="text" {...register("idNotationTarget")} />
      </fieldset>
      <fieldset>
        <label htmlFor="idNotationFrom">
          <Translate>Utilisateur</Translate>
        </label>
        <input type="text" {...register("idNotationFrom")} />
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

export default FormPostNotation
