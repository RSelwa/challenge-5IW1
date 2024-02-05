import React, { Fragment, useState } from "react"
import { useForm } from "react-hook-form"
import { SemaineType } from "@/types/api/slots"
import type { SemaineTypeWithId } from "@/types/withId"
import { daysInWeekSchedule } from "@/constants/date"
import { EMPLOYEE_API_ROUTES } from "@/constants/db"
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
        day: data.day,
        endTimeAfternoon: data.endTimeAfternoon,
        endTimeMorning: data.endTimeMorning,
        startTimeMorning: data.startTimeMorning,
        startTimeAfternoon: data.startTimeAfternoon,

        employee: EMPLOYEE_API_ROUTES + "/" + data.employee
      }
      postNewDaySchedule(newDay)
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
      <p>{daysInWeekSchedule[day.day]}</p>
      <input
        className="w-[150px]"
        {...register("startTimeMorning", {
          valueAsNumber: true
        })}
        type="number"
        min={6}
      />
      <input
        className="w-[150px]"
        {...register("endTimeMorning", {
          valueAsNumber: true
        })}
        type="number"
        min={day.startTimeMorning}
      />

      <input
        className="w-[150px]"
        {...register("startTimeAfternoon", {
          valueAsNumber: true
        })}
        type="number"
        min={day.endTimeMorning}
      />

      <input
        className="w-[150px]"
        {...register("endTimeAfternoon", {
          valueAsNumber: true
        })}
        type="number"
        min={day.startTimeAfternoon}
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
