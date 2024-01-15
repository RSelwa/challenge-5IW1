import React, { Fragment, useState } from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import type { UserInfosFormData } from "@/types/formData"
import { editUser } from "@/lib/users"

const UserInfosForm = () => {
  const { handleSubmit, register, reset } = useForm<UserInfosFormData>()
  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = (data: UserInfosFormData) => {
    editUser(data)
    setIsEditing(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <input
        disabled={!isEditing}
        required
        placeholder="First Name"
        type="text"
        className="col-span-2"
        {...register("firstname")}
      />
      <input
        disabled={!isEditing}
        required
        placeholder="Last Name"
        type="text"
        {...register("lastname")}
      />
       <input
        disabled={!isEditing}
        required
        placeholder="Email"
        type="email"
        {...register("email")}
      />
      <div className="flex gap-3">
        {isEditing ? (
          <Fragment>
            <Button
              onClick={() => {
                reset()
                setIsEditing(false)
              }}
              className="col-span-2 w-full bg-red-500 text-neutral-800"
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="col-span-2 w-full bg-green-500 text-neutral-800"
              type="submit"
            >
              Save
            </Button>
          </Fragment>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="col-span-2 w-full bg-amber-500 text-neutral-800"
            type="button"
          >
            Edit
          </Button>
        )}
      </div>
    </form>
  )
}

export default UserInfosForm
