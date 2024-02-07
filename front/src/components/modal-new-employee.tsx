import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import type { EmployeePost } from "@/types/api/employees"
import { ESTABLISHMENT_API_ROUTES } from "@/constants/db"
import { specialisationsDoctolib } from "@/constants/employee"
import { postEmployee } from "@/lib/employees"

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
      await postEmployee({
        ...data,
        establishment: ESTABLISHMENT_API_ROUTES + "/" + establishmentId
      })
      navigate(0)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
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
        Créer un nouvel employé
      </button>
    </form>
  )
}

export default ModalNewEmployee
