import React, { Fragment, useEffect, useState } from "react"
import { Button } from "@radix-ui/themes"
import { Translate } from "react-auto-translate"
import { useForm } from "react-hook-form"
import toast, { LoaderIcon } from "react-hot-toast"
import type { UserInfosProfileFormData } from "@/types/formData"
import { editProfileUser, fetchUser } from "@/lib/users"
import { parseJwt } from "@/utils/redux"

const UserInfosForm = () => {
  const { handleSubmit, register, setValue } =
    useForm<UserInfosProfileFormData>()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { id } = parseJwt(localStorage.getItem("token") || "")

  const onSubmit = async (data: UserInfosProfileFormData) => {
    try {
      await toast.promise(editProfileUser(id, data), {
        loading: "On loading",
        success: "success",
        error: "error"
      })
      setIsEditing(false)
      fetchUserInformations()
    } catch (error) {
      console.error(error)
    }
  }

  const fetchUserInformations = async () => {
    setIsLoading(true)
    try {
      const user = await fetchUser(id)
      setValue("firstname", user.firstname)
      setValue("lastname", user.lastname)
      setValue("email", user.email)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUserInformations()
  }, [])

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-8">
        <LoaderIcon />
      </div>
    )
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-3"
    >
      <input
        disabled={!isEditing}
        required
        placeholder="Prénom"
        type="text"
        {...register("firstname")}
      />
      <input
        disabled={!isEditing}
        required
        placeholder="Nom"
        type="text"
        {...register("lastname")}
      />
      <input
        disabled={true}
        required
        placeholder="Email"
        type="email"
        {...register("email")}
      />
      <div className="flex gap-3 font-bold text-white">
        {isEditing ? (
          <Fragment>
            <Button
              onClick={() => {
                fetchUserInformations()
                setIsEditing(false)
              }}
              className="bg-red-500 "
              type="button"
            >
              <Translate>Annuler</Translate>
            </Button>
            <Button className="bg-green-500 " type="submit">
              <Translate>Sauvegarder</Translate>
            </Button>
          </Fragment>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className=" bg-amber-500 "
            type="button"
          >
            <Translate>Modifier</Translate>
          </Button>
        )}
      </div>
    </form>
  )
}

export default UserInfosForm
