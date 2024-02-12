import React, { useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { EmployeePost } from "@/types/api/employees"
import { EMPLOYEE_API_ROUTES, ESTABLISHMENT_API_ROUTES } from "@/constants/db"
import { specialisationsDoctolib } from "@/constants/employee"
import { postEmployee } from "@/lib/employees"
import { postEmployeeWeekSchedule } from "@/lib/employeeSchedule"

type Props = {
  establishmentId: string
}

const ModalNewEmployee = ({ establishmentId }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { handleSubmit, register } = useForm<EmployeePost>()
  const createNewEmployee = async (data: EmployeePost) => {
    setIsLoading(true)
    try {
      const { id } = await postEmployee({
        ...data,
        establishment: ESTABLISHMENT_API_ROUTES + "/" + establishmentId
      })
      await addWeekSchedule(id)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const addWeekSchedule = async (employeeId: string) => {
    try {
      const days = [0, 6]
      for (const day of days) {
        await postEmployeeWeekSchedule({
          day: day,
          startTimeMorning: 12,
          endTimeMorning: 12,
          endTimeAfternoon: 18,
          startTimeAfternoon: 18,

          employee: employeeId.includes(EMPLOYEE_API_ROUTES)
            ? employeeId
            : EMPLOYEE_API_ROUTES + "/" + employeeId
        })
      }

      navigate(0)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form onSubmit={handleSubmit(createNewEmployee)} className="space-y-2 p-2">
      <select {...register("category")}>
        {specialisationsDoctolib.map((specialisation) => (
          <option key={specialisation} value={specialisation}>
            {specialisation}
          </option>
        ))}
      </select>
      <input
        placeholder="Prénom"
        required
        type="text"
        {...register("firstname")}
      />
      <input placeholder="Nom" required type="text" {...register("lastname")} />
      <input placeholder="Email" required type="email" {...register("email")} />
      <input
        placeholder="Mot de passe"
        required
        type="password"
        {...register("plainPassword")}
      />

      <button
        disabled={isLoading}
        type="submit"
        className="rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-700"
      >
        <Translate>Créer un nouvel employé</Translate>
      </button>
    </form>
  )
}

export default ModalNewEmployee
