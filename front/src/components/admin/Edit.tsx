import React, { Fragment, useState } from "react"
import * as Form from "@radix-ui/react-form"
import { FormMessageProps } from "@radix-ui/react-form"
import { Button } from "@radix-ui/themes"
import type { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { useForm } from "react-hook-form"

type Props<T> = {
  data: T
  onSubmit: (data: T) => Promise<void>
}

const Edit = <T,>({ data, onSubmit }: Props<T>) => {
  const [isEdit, setIsEdit] = useState(false)

  const { register, getValues, reset } = useForm({
    defaultValues: data as FieldValues
  })

  const cancelChanges = () => {
    reset()
    setIsEdit(false)
  }

  return (
    <Form.Root
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(getValues() as T)
        setIsEdit(false)
      }}
    >
      <FormItem
        isEdit={isEdit}
        name="email"
        label="Email"
        register={register}
      />
      <div>
        {isEdit ? (
          <Fragment>
            <Button
              type="button"
              className="bg-red-500"
              onClick={cancelChanges}
            >
              Cancel{" "}
            </Button>
            <Form.Submit asChild>
              <Button className="bg-green-500">Save</Button>
            </Form.Submit>
          </Fragment>
        ) : (
          <Button
            className="bg-blue-500"
            type="button"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
        )}
      </div>
    </Form.Root>
  )
}

export default Edit

const FormItem = <T,>({
  label,
  isEdit,
  register,
  name,
  formMessages
}: {
  label: string
  isEdit: boolean
  register: UseFormRegister<FieldValues>
  name: string
  formMessages?: FormMessageProps[]
}) => {
  return (
    <Form.Field name="test">
      <Form.Label>{label} </Form.Label>
      <Form.Control
        disabled={!isEdit}
        type="email"
        required
        {...register(name as Path<T>)}
      />
      {formMessages?.map((formMessage, index) => (
        <Form.Message
          key={index}
          className="FormMessage"
          match={formMessage.match}
        >
          {formMessage.name}
        </Form.Message>
      ))}
      {/* <Form.Message className="FormMessage" match="valueMissing">
        Please enter your email
      </Form.Message>
      <Form.Message className="FormMessage" match="typeMismatch">
        Please provide a valid email
      </Form.Message> */}
    </Form.Field>
  )
}
