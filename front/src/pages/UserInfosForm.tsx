import React, { useState } from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import type { UserInfosFormData } from "@/types/formData"
import { editUser } from "@/lib/users"

const UserInfosForm = () => {
    const {handleSubmit, register} = useForm<UserInfosFormData>()
    const [isEditing, setIsEditing] = useState(false)
    
    const onSubmit = (data: UserInfosFormData) =>
        editUser(data)

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
              <Button
                className="col-span-2 w-full bg-amber-500 text-neutral-800"
                type="submit"
              >
                Update
              </Button>
            </form>
          )
}

export default UserInfosForm