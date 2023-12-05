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

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
