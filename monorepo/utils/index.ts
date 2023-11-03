import type { ClassArray } from "clsx"
import clsx from "clsx"
// eslint-disable-next-line no-restricted-imports
import { twMerge } from "tailwind-merge"

export const logHello = () => {
  console.log("hello")
}
export const sum = (a: number, b: number) => a + b
export const cn = (...inputs: ClassArray) => {
  return twMerge(clsx(inputs))
}
