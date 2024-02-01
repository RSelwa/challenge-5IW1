import React, { ChangeEvent, useState } from "react"
import { Button } from "@radix-ui/themes"
import { useForm } from "react-hook-form"
import type { SigninEmployeeFormData } from "@/types/formData"
import { postEmployee } from "@/lib/employees"
import { postData } from "@/utils/db"
import { specialisationsDoctolib } from "@/constants/employee"

const SigninEmployeeForm = () => {
  const { handleSubmit, register } = useForm<SigninEmployeeFormData>()
  const [selected, setSelected] = useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('Label', event.target.selectedOptions[0].label);
    console.log(event.target.value);

    setSelected(event.target.value);
  }

  const onSubmit = (data: SigninEmployeeFormData) =>
    postData(postEmployee(data))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <input
        required
        placeholder="Employee firstname"
        type="text"
        {...register("firstname")}
      />
      <input
        required
        placeholder="Employee lastname"
        type="text"
        {...register("lastname")}
      />
      <select value={selected} onChange={handleChange}>
        <option disabled={true} value="">Select a category</option>
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
        placeholder="Password"
        type="password"
        className="col-span-2"
        {...register("plainPassword")}
      />
      
      <Button
        className="col-span-2 w-full bg-amber-500 text-neutral-800"
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}

export default SigninEmployeeForm
