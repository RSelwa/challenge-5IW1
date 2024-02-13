import React, { useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "react-hot-toast"
import { EMPLOYEESPECIFICSCHEDULE_API_ROUTES } from "@/constants/db"

const FormPostSpecificSchedules = () => {
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
        `${import.meta.env.VITE_API_URL}${EMPLOYEESPECIFICSCHEDULE_API_ROUTES}`,

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
        <label htmlFor="employee">
          <Translate>Employé</Translate>
        </label>
        <input type="text" {...register("employee")} />
      </fieldset>
      <fieldset>
        <label htmlFor="date">
          <Translate>Date</Translate>
        </label>
        <input type="date" {...register("date", { valueAsDate: true })} />
      </fieldset>
      <fieldset>
        <label htmlFor="type">
          <Translate>Type</Translate>
        </label>
        <input type="text" {...register("type")} />
      </fieldset>
      <fieldset>
        <label htmlFor="status">
          <Translate>Status</Translate>
        </label>
        <input type="text" {...register("status")} />
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

export default FormPostSpecificSchedules
