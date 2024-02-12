import React, { Fragment, useState } from "react"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import type { ServicesWithId } from "@/types/withId"
import { editService } from "@/lib/services"

type Props = { service: ServicesWithId; fetchMyServices: () => void }

const ModalEditService = ({ service, fetchMyServices }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const { register, handleSubmit, reset } = useForm<ServicesWithId>({
    defaultValues: {
      duration: service.duration,
      id: service.id,
      price: service.price,
      name: service.name
    }
  })
  const editExistingService = async (data: Partial<ServicesWithId>) => {
    await editService(data)
    fetchMyServices()
  }

  return (
    <form
      onSubmit={handleSubmit(editExistingService)}
      className="flex flex-col gap-3 rounded bg-white p-4 "
    >
      <input
        disabled={!isEditing}
        placeholder="name"
        type="text"
        {...register("name")}
        className="rounded border-2 border-gray-300 px-2 py-1"
      />
      <input
        disabled={!isEditing}
        placeholder="duration"
        type="number"
        {...register("duration", { valueAsNumber: true })}
        className="rounded border-2 border-gray-300 px-2 py-1"
      />
      <input
        disabled={!isEditing}
        placeholder="price"
        type="number"
        {...register("price", { valueAsNumber: true })}
        className="rounded border-2 border-gray-300 px-2 py-1"
      />
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

export default ModalEditService
