import React, { Fragment, useState } from "react"
import * as Form from "@radix-ui/react-form"
import type { FormMessageProps } from "@radix-ui/react-form"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"
import { Translate } from "react-auto-translate"
import type { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import type { DataKeyLink } from "@/types/admin"
import { deleteEntity } from "@/lib/delete"
import { cn } from "@/utils"

type Props<T> = {
  data: T
  onSubmit: (data: T) => Promise<void>
  dataKeyException: string[]
  dataKeyLink?: DataKeyLink
  id: string
  route: string
}

const Edit = <T,>({
  data,
  onSubmit,
  dataKeyException,
  dataKeyLink,
  id,
  route
}: Props<T>) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const { register, getValues, reset } = useForm({
    defaultValues: data as FieldValues
  })

  const cancelChanges = () => {
    reset()
    setIsEdit(false)
  }
  const deleteItem = async () => {
    setIsloading(true)
    try {
      if (!id || !route) return
      await deleteEntity(id, route)
    } catch (error) {
      console.error(error)
    }
    setIsloading(false)
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
      className="mx-auto w-1/2 space-y-4 p-8"
    >
      {Object.entries(data as any)
        .filter(([key]) => !dataKeyException.includes(key))
        .map(([key, value], index) => (
          <FormItem
            value={value}
            type={typeof value}
            key={index}
            isEdit={isEdit}
            name={key}
            label={key}
            register={register}
            dataKeyLink={dataKeyLink}
          />
        ))}
      <div className="flex gap-2">
        {isEdit ? (
          <Fragment>
            <Button
              type="button"
              className="bg-red-500"
              disabled={isLoading}
              onClick={cancelChanges}
            >
              <Translate>Annuler</Translate>
            </Button>
            <Form.Submit asChild>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-500"
              >
                <Translate>Sauvegarder</Translate>
              </Button>
            </Form.Submit>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              className="bg-blue-500"
              type="button"
              disabled={isLoading}
              onClick={() => setIsEdit(true)}
            >
              <Translate>Modifier</Translate>
            </Button>
            <Button
              className="bg-red-500"
              type="button"
              disabled={isLoading}
              onClick={deleteItem}
            >
              <Translate>Supprimer</Translate>
            </Button>
          </Fragment>
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
  value,
  dataKeyLink,
  type
}: {
  label: string
  isEdit: boolean
  register: UseFormRegister<FieldValues>
  name: string
  formMessages?: FormMessageProps[]
  value: any
  dataKeyLink?: DataKeyLink

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

  const linkToOther = dataKeyLink?.find((dataKey) => dataKey.name === name)
  console.log(linkToOther, value)

  return (
    <Form.Field name="test" className="flex flex-col gap-2">
      <Form.Label>{label} </Form.Label>
      {linkToOther ? (
        linkToOther.type === "array" ? (
          value.map((valueItem: any, i: number) => (
            <LinkToOtherItem
              key={i}
              label={valueItem[linkToOther.displayName]}
              smallUrl={`/admin/${name}`}
              url={`/admin/${name}/${valueItem.id}`}
            />
          ))
        ) : (
          <LinkToOtherItem
            label={value[linkToOther.displayName]}
            smallUrl={`/admin/${name}`}
            url={`/admin/${name}/${value.id}`}
          />
        )
      ) : (
        // <div>test</div>
        <Form.Control
          disabled={!isEdit}
          type={matchingType()}
          required
          className={cn(
            isEdit ? "" : "cursor-default border-x-0 border-b-2 border-t-0"
          )}
          {...register(name as Path<T>)}
        />
      )}
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

const LinkToOtherItem = ({
  label,
  url,
  smallUrl
}: {
  label: string
  url: string
  smallUrl: string
}) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between">
      <p> {label}</p>
      <Button
        onClick={() => {
          navigate(smallUrl)
          setTimeout(() => {
            navigate(url)
          }, 50)
        }}
      >
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
