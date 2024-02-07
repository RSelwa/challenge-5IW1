import React from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import type { PostService } from "@/types/api/services"
import { EMPLOYEE_API_ROUTES } from "@/constants/db"
import { postService } from "@/lib/services"

type Props = {
  employeeId: string
  fetchMyServices: () => void
}

const ModalNewService = ({ employeeId, fetchMyServices }: Props) => {
  const { register, handleSubmit } = useForm<PostService>({
    defaultValues: {
      employee: EMPLOYEE_API_ROUTES + "/" + employeeId,
      slots: []
    }
  })
  const newService = async (data: PostService) => {
    await postService(data)
    fetchMyServices()
  }
  return (
    <form
      onSubmit={handleSubmit(newService)}
      className="flex flex-col gap-2 p-4"
    >
      <input
        className="rounded border-2 border-gray-300 px-2 py-1"
        placeholder="Nom de la prestation"
        type="text"
        {...register("name")}
      />
      <input
        className="rounded border-2 border-gray-300 px-2 py-1"
        placeholder="Durée (en H)"
        type="number"
        {...register("duration", { valueAsNumber: true })}
      />
      <input
        className="rounded border-2 border-gray-300 px-2 py-1"
        placeholder="Prix (en €)"
        type="number"
        {...register("price", { valueAsNumber: true })}
      />
      <button
        type="submit"
        className="rounded bg-emerald-500 px-2 py-1 text-center text-sm text-white hover:bg-emerald-600"
      >
        <Translate>Sauvegarder</Translate>
      </button>
    </form>
  )
}

export default ModalNewService
