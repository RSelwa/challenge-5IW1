import React, { Fragment, useState } from "react"
import { useForm } from "react-hook-form"
import type { SemaineTypeWithId } from "@/types/withId"
import { daysInWeekSchedule } from "@/constants/date"
import { EMPLOYEE_API_ROUTES } from "@/constants/db"
import {
  editEmployeeWeekSchedule,
  postEmployeeWeekSchedule
} from "@/lib/employeeSchedule"
import { Translate } from "react-auto-translate"


type Props = {
  day: SemaineTypeWithId
  fetchEmployeeSchedule: () => void
}

const EmployeeWeekEdit = ({ day, fetchEmployeeSchedule }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const { register, reset, handleSubmit } = useForm<SemaineTypeWithId>({
    defaultValues: day as any
  })
  const values = [
    { value: "startTimeMorning", label: "Début de matinée" },
    { value: "endTimeMorning", label: "Fin de matinée" },
    { value: "startTimeAfternoon", label: "Début de l'après midi" },
    { value: "endTimeAfternoon", label: "Fin de l'après midi" }
  ]

  const onSubmit = async (data: SemaineTypeWithId) => {
    console.log(data)
    if (data.id) {
      await editEmployeeWeekSchedule(data)
    } else {
      const newDay = {
        day: data.day,
        endTimeAfternoon: data.endTimeAfternoon,
        endTimeMorning: data.endTimeMorning,
        startTimeMorning: data.startTimeMorning,
        startTimeAfternoon: data.startTimeAfternoon,

        employee: data.employee.includes(EMPLOYEE_API_ROUTES)
          ? data.employee
          : EMPLOYEE_API_ROUTES + "/" + data.employee
      }
      await postEmployeeWeekSchedule(newDay)
    }
    fetchEmployeeSchedule()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded bg-white p-2"
    >
      <p>{daysInWeekSchedule[day.day - 1]}</p>
      <div className="space-y-2">
        {values.map(({ value, label }) => (
          <fieldset key={value} className="grid grid-cols-5">
            <label className="col-span-4" htmlFor={value}>
              {label}
            </label>
            <input
              className="w-12"
              {...register(value as any, {
                valueAsNumber: true
              })}
              type="number"
              disabled={!isEditing}
            />
          </fieldset>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {isEditing && (
          <Fragment>
            <button
              onClick={() => {
                reset()
                setIsEditing(false)
              }}
              className="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
            >
             <Translate>Annuler</Translate> 
            </button>
            <button
              type="submit"
              className="rounded bg-emerald-500 px-2 py-1 text-sm text-white hover:bg-emerald-600"
            >
              <Translate>Sauvegarder</Translate>
            </button>
          </Fragment>
        )}
        {!isEditing && (
          <button
            className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
          >
            <Translate>Modifier</Translate>
          </button>
        )}
      </div>
    </form>
  )
}

export default EmployeeWeekEdit
