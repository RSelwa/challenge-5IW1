import React from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import type { UserInfosFormData } from "@/types/formData"
//import { putUserInfos } from "@/lib/organizations"

const UserInfosForm = () => {
    const {handleSubmit, register} = useForm<UserInfosFormData>()

    
    // const onSubmit = (data: UserInfosFormData) =>
    //     putData(putUserInfos(data))

        // return (
        //     <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        //       <input
        //         required
        //         placeholder="First Name"
        //         type="text"
        //         className="col-span-2"
        //         {...register("firstname")}
        //       />
        //       <input
        //         required
        //         placeholder="Last Name"
        //         type="text"
        //         {...register("lastname")}
        //       />
        //       <Button
        //         className="col-span-2 w-full bg-amber-500 text-neutral-800"
        //         type="submit"
        //       >
        //         Update
        //       </Button>
        //     </form>
        //   )
}