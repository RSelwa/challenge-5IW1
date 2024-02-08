import type { ChangeEvent } from "react"
import React, { useState } from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import type { EmployeePost } from "@/types/api/employees"
import { specialisationsDoctolib } from "@/constants/employee"
import { postEmployee } from "@/lib/employees"
import { postData } from "@/utils/db"
import { Translate } from "react-auto-translate"

const SigninEmployeeForm = () => {
  const { handleSubmit, register } = useForm<EmployeePost>()
  const [selected, setSelected] = useState("")

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("Label", event.target.selectedOptions[0].label)
    console.log(event.target.value)

    setSelected(event.target.value)
  }

  const onSubmit = (data: EmployeePost) => postData(postEmployee(data))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <input
        required
        placeholder="Prénom de l'employée"
        type="text"
        {...register("firstname")}
      />
      <input
        required
        placeholder="Nom de l'employée"
        type="text"
        {...register("lastname")}
      />
      <select value={selected} onChange={handleChange}>
        <option disabled={true} value="">
         <Translate>Selectionner une cathégorie</Translate> 
        </option>
        {specialisationsDoctolib.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        required
        placeholder="Email"
        className="col-span-2"
        type="email"
        {...register("email")}
      />
      <input
        required
        placeholder="Mot de passe"
        type="password"
        className="col-span-2"
        {...register("plainPassword")}
      />

      <Button
        className="col-span-2 w-full bg-amber-500 text-neutral-800"
        type="submit"
      >
       <Translate>Envoyer</Translate> 
      </Button>
    </form>
  )
}

export default SigninEmployeeForm
