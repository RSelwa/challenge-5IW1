import React, { InputHTMLAttributes } from 'react';
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { cn } from "@/monorepo/utils"

type InputVariant = "default" | "outline" | "subtle" | "ghost"

const inputVariants = cva(
  "font-regular peer relative rounded-md p-[7px] ring-offset-1 transition-colors duration-150 invalid:border-error-600 focus:outline-none focus:ring-2 focus:ring-info-200/70 active:outline-none disabled:cursor-not-allowed disabled:border-neutral-100 disabled:text-neutral-100 disabled:placeholder:text-neutral-50",
  {
    variants: {
      variant: {
        default:
          "rounded border border-neutral-300 bg-white placeholder:text-neutral-300",
        outline: "rounded border border-neutral-300 bg-white text-neutral-base",
        subtle:
          "rounded bg-neutral-50 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-100",
        ghost:
          "dark:text-primary-400 rounded bg-transparent text-primary-base hover:bg-primary-50 data-[state=open]:bg-transparent dark:hover:bg-gray-900 dark:data-[state=open]:bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    variant: InputVariant
    stateRegister: string
    register: any
    urlRedirect?: string
    listTags?: string[]
    labelClassName?: string
    containerClassName?: string
    label?: string
  }
const Input = ({
    id,
    label,
    placeholder,
    stateRegister,
    register,
    urlRedirect,
    className,
    labelClassName,
    containerClassName,
    variant = "default",
    type = "text",
    name,
    required,
    disabled,
    ...props
  }: InputProps) => {
    return (
      <div className={containerClassName}>
        {label && (
          <label onClick={()=>console.log(urlRedirect)} htmlFor={id} className={labelClassName}>
            {label}
          </label>
        )}
        <input
        {...props}
          id={id}
          placeholder={placeholder}
          name={name}
          required={required}
          disabled={disabled}
          type={type || "text"}
          {...register(stateRegister, {
            ...(type === "number" && { valueAsNumber: true }),
            ...(type === "date" && { valueAsDate: true }),
            required,
            disabled
          })}
          className={cn(
            inputVariants({ variant, className }),
            type === "number" && "pr-8",
            type === "date" && "text-sm",
            "border-gray-200"
          )}
        />
      </div>
    )
  }


export default Input
