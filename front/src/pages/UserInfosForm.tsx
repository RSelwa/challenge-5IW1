import React, { Fragment, useState } from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import type { UserInfosProfileFormData } from "@/types/formData"
import { editProfileUser } from "@/lib/users"
import { parseJwt } from "@/utils/redux"
import toast from "react-hot-toast"


const UserInfosForm = () => {
  const { handleSubmit, register, reset } = useForm<UserInfosProfileFormData>()
  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = async (data: UserInfosProfileFormData) => {
    // ! FAUT ATTENDRE QUE LE TOKEN SOIT DANS L'ID RAPPPHH
    // const token = localStorage.getItem('token');
    try {
      const userId = "018c3b5a-98d8-7070-a1bf-3f9a2eb03dc6" // ! A CHANGER
      toast.promise(editProfileUser(userId, data), {loading : "On loading", success : "success", error : "error"})
      
    } catch (error) {
      console.error(error)
    }
    setIsEditing(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2   w-1/2 gap-4">
      <input
        disabled={!isEditing}
        required
        placeholder="First Name"
        type="text"
        className="col-span"
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
              className="col-span w-100 bg-orange-500 text-neutral-800"
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="col-span w-100 bg-green-500 text-neutral-800"
              type="submit"
            >
              Save
            </Button>
          </Fragment>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="col-span w-100 bg-amber-500 text-neutral-800"
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
