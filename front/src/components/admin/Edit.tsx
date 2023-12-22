import React, { Fragment, useState } from "react"
import * as Form from "@radix-ui/react-form"
import type { FormMessageProps } from "@radix-ui/react-form"
import { Button } from "@radix-ui/themes"
import type { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { cn } from "@/utils"

type Props<T> = {
  data: T
  onSubmit: (data: T) => Promise<void>
  dataKeyException: string[]
}

const Edit = <T,>({ data, onSubmit, dataKeyException }: Props<T>) => {
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
        toast.promise(onSubmit(getValues() as T), {
          error: "error",
          loading: "Loading...",
          success: "success"
        })
        setIsEdit(false)
      }}
    >
      {Object.entries(data as any)
        .filter(([key]) => !dataKeyException.includes(key))
        .map(([key, value], index) => {
          console.log(key, value)

          return (
            <FormItem
              type={typeof value}
              key={index}
              isEdit={isEdit}
              name={key}
              label={key}
              register={register}
            />
          )
        })}
      <div>
        {isEdit ? (
          <Fragment>
            <Button
              type="button"
              className="bg-red-500"
              onClick={cancelChanges}
            >
              Cancel
            </Button>
            <Form.Submit asChild>
              <Button type="submit" className="bg-green-500">
                Save
              </Button>
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
  formMessages,
  type
}: {
  label: string
  isEdit: boolean
  register: UseFormRegister<FieldValues>
  name: string
  formMessages?: FormMessageProps[]
  type?:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
}) => {
  const matchingType = (): "text" | "number" | "email" => {
    switch (type) {
      case "string":
        return name === "email" ? "email" : "text"
      case "number":
        return "number"

      default:
        return "text"
    }
  }

  return (
    <Form.Field name="test">
      <Form.Label>{label} </Form.Label>
      <Form.Control
        disabled={!isEdit}
        type={matchingType()}
        required
        className={cn(
          isEdit ? "" : "cursor-default border-x-0 border-b-2 border-t-0"
        )}
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
      {name === "email" && (
        <Fragment>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </Fragment>
      )}
    </Form.Field>
  )
}
