import React, { Fragment, useState } from "react"
import { useForm } from "react-hook-form"
import { SemaineType } from "@/types/api/slots"
import type { SemaineTypeWithId } from "@/types/withId"
import { daysInWeekSchedule } from "@/constants/date"
import {
  EMPLOYEE_API_ROUTES,
  EMPLOYEEWEEKSCHEDULE_API_ROUTES,
  USER_API_ROUTES
} from "@/constants/db"
import { postEmployeeWeekSchedule } from "@/lib/employeeSchedule"

type Props = {
  day: SemaineTypeWithId
  employeeId: string
}

const EmployeeWeekEdit = ({ day, employeeId }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const { register, reset, handleSubmit } = useForm<SemaineTypeWithId>({
    defaultValues: day as any
  })

  const onSubmit = (data: SemaineTypeWithId) => {
    console.log(data)
    if (data.id) {
      editDaySchedule()
    } else {
      const newDay = {
        day: data.dayOfWeek,
        endTimeAprem: data.endTimeAprem,
        endTimeMatinee: data.endTimeMatinee,
        startTimeAprem: data.startTimeAprem,
        startTimeMatinee: data.startTimeMatinee,

        employee: EMPLOYEE_API_ROUTES + "/" + data.employeeId
      }
      postNewDaySchedule(newDay as any)
    }
  }
  const postNewDaySchedule = async (newDay: SemaineType) => {
    try {
      console.log(newDay)

      await postEmployeeWeekSchedule(newDay)
    } catch (error) {
      console.error(error)
    }
  }
  const editDaySchedule = async () => {
    try {
      console.log("edit")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded bg-white p-2">
      <p>{daysInWeekSchedule[day.dayOfWeek]}</p>
      <input
        className="w-[150px]"
        {...register("startTimeMatinee", {
          valueAsNumber: true
        })}
        type="number"
        min={6}
      />
      <input
        className="w-[150px]"
        {...register("endTimeMatinee", {
          valueAsNumber: true
        })}
        type="number"
        min={day.startTimeMatinee}
      />

      <input
        className="w-[150px]"
        {...register("startTimeAprem", {
          valueAsNumber: true
        })}
        type="number"
        min={day.endTimeMatinee}
      />

      <input
        className="w-[150px]"
        {...register("endTimeAprem", {
          valueAsNumber: true
        })}
        type="number"
        min={day.startTimeAprem}
      />

      <div>
        {isEditing && (
          <Fragment>
            <button
              onClick={() => {
                reset()
                setIsEditing(false)
              }}
            >
              Annuler
            </button>
            <button type="submit">Sauvegarder</button>
          </Fragment>
        )}
        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      </div>
    </form>
  )
}

export default EmployeeWeekEdit
