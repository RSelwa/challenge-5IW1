import React, { useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "react-hot-toast"
import { EMPLOYEEWEEKSCHEDULE_API_ROUTES } from "@/constants/db"

const FormPostWeekSchedules = () => {
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
        `${import.meta.env.VITE_API_URL}${EMPLOYEEWEEKSCHEDULE_API_ROUTES}`,

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
        <label htmlFor="startTimeMorning">
          <Translate>Début matinée</Translate>
        </label>
        <input
          type="number"
          {...register("startTimeMorning", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="endTimeMorning">
          <Translate>Fin matinée</Translate>
        </label>
        <input
          type="number"
          {...register("endTimeMorning", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="startTimeAfternoon">
          <Translate>Début après midi</Translate>
        </label>
        <input
          type="number"
          {...register("startTimeAfternoon", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="endTimeAfternoon">
          <Translate>Fin après midi</Translate>
        </label>
        <input
          type="number"
          {...register("endTimeAfternoon", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="day">
          <Translate>Jour</Translate>
        </label>
        <input type="number" {...register("day", { valueAsNumber: true })} />
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

export default FormPostWeekSchedules
