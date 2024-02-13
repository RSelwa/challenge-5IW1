import React, { useState } from "react"
import { useForm } from "react-hook-form"
import type {
  PostSpecificSchedule,
  SpecificScheduleForm
} from "@/types/api/employeeSpecificSchedule"
import { EMPLOYEE_API_ROUTES } from "@/constants/db"
import { postEmployeeSpecificSchedule } from "@/lib/employeeSpecificSchedules"
import { getDatesBetween } from "@/utils/date"
import { parseJwt } from "@/utils/redux"
import { STATUS_SPECIFIC_SCHEDULE, TYPE_SPECIFIC_SCHEDULE } from "@/constants"

type Props = {
  employeeId: string
  fetchEmployeeSpecificSchedule: () => void
}

const ModalNewSpecificSchedule = ({
  employeeId,
  fetchEmployeeSpecificSchedule
}: Props) => {
  const { roles } = parseJwt(localStorage.getItem("token") || "")
  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const { register, handleSubmit } = useForm<SpecificScheduleForm>({
    defaultValues: {
      employee: EMPLOYEE_API_ROUTES + "/" + employeeId,
      type: "conges"
    }
  })

  const newSpecificSchedule = async (data: SpecificScheduleForm) => {
    try {
      setIsLoading(true)
      if (data.isOnlyOneDay) {
        const newSchedule: PostSpecificSchedule = {
          employee: data.employee,
          date: new Date(data.date),
          type: data.type,
          status: data.status
        }

        await postEmployeeSpecificSchedule(newSchedule)
        fetchEmployeeSpecificSchedule()
      } else {
        const daysOfSchedule = getDatesBetween(
          new Date(data.date),
          new Date(data.endDate)
        )

        daysOfSchedule.forEach(async (date) => {
          const newSchedule: PostSpecificSchedule = {
            employee: data.employee,
            date: date,
            type: data.type,
            status: data.status
          }

          await postEmployeeSpecificSchedule(newSchedule)
        })
        fetchEmployeeSpecificSchedule()
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(newSpecificSchedule)}
      className="grid grid-cols-2 gap-2 p-4"
    >
      <fieldset className="col-span-2 flex flex-col gap-2">
        <label htmlFor="date">Type de congé</label>
        <select
          required
          className="rounded border-2 border-gray-300 px-2 py-1"
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
        <label htmlFor="date">Début du congé</label>
        <input
          required
          className="rounded border-2 border-gray-300 px-2 py-1"
          type="date"
          {...register("date")}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="endDate">fin du congé</label>

        <input
          required
          className="rounded border-2 border-gray-300 px-2 py-1 disabled:bg-gray-300"
          placeholder="fin du congé"
          disabled={isChecked}
          type="date"
          {...register("endDate")}
        />
      </fieldset>
      <fieldset className="flex gap-2">
        <label htmlFor="isOnlyOneDay">Un seul jour</label>
        <input
          className="rounded border-2 border-gray-300 px-2 py-1"
          placeholder="Is only one day"
          type="checkbox"
          {...register("isOnlyOneDay", {
            onChange: (e) => {
              setIsChecked(e.target.checked)
            }
          })}
        />
      </fieldset>
      {roles.includes("ROLE_ORGANIZATION") && (
        <fieldset>
          <label htmlFor="status">Status:</label>

          <select {...register("status")}>
            {STATUS_SPECIFIC_SCHEDULE.map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </select>
        </fieldset>
      )}

      <button
        disabled={isLoading}
        type="submit"
        className="col-span-2 rounded bg-emerald-500 px-2 py-1 text-center text-sm text-white hover:bg-emerald-600"
      >
        Sauvegarder
      </button>
    </form>
  )
}

export default ModalNewSpecificSchedule
