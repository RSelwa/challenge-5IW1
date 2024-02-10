import React, { Fragment, useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import type { EmployeeSpecificSchedulesWithId } from "@/types/withId"
import { editEmployeeSpecificSchedule } from "@/lib/employeeSpecificSchedules"
import { TYPE_SPECIFIC_SCHEDULE } from "@/constants"

type Props = {
  specificSchedule: EmployeeSpecificSchedulesWithId
  fetchEmployeeSpecificSchedule: () => void
}

const ModalEditSpecificSchedule = ({
  fetchEmployeeSpecificSchedule,
  specificSchedule
}: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const { register, handleSubmit, reset } =
    useForm<EmployeeSpecificSchedulesWithId>({
      defaultValues: {
        id: specificSchedule.id,
        date: new Date(specificSchedule.date).toISOString().substring(0, 10),
        type: specificSchedule.type
      }
    })
  const editExistingSpecificSchedule = async (
    data: Partial<EmployeeSpecificSchedulesWithId>
  ) => {
    await editEmployeeSpecificSchedule({
      ...data,
      date: new Date(data.date || "") as any
    })
    fetchEmployeeSpecificSchedule()
  }

  return (
    <form
      onSubmit={handleSubmit(editExistingSpecificSchedule)}
      className="flex flex-col gap-3 rounded bg-white p-4 "
    >
      <fieldset className="col-span-2 flex flex-col gap-2">
        <label htmlFor="date">Type de congé</label>
        <select
          disabled={!isEditing}
          className="rounded border-2 border-gray-300 px-2 py-1 disabled:border-transparent"
          {...register("type")}
        >
          {TYPE_SPECIFIC_SCHEDULE.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="date">Date du congé</label>
        <input
          disabled={!isEditing}
          className="rounded border-2 border-gray-300 px-2 py-1"
          type="date"
          {...register("date", { valueAsDate: true })}
        />
      </fieldset>
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
            <Translate>Editer</Translate>
          </button>
        )}
      </div>
    </form>
  )
}

export default ModalEditSpecificSchedule
