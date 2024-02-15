import type { ClassArray } from "clsx"
import clsx from "clsx"
// eslint-disable-next-line no-restricted-imports
import { twMerge } from "tailwind-merge"
import type { BaseEntity } from "@/types"

export const sum = (a: number, b: number) => a + b
export const cn = (...inputs: ClassArray) => {
  return twMerge(clsx(inputs))
}

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const tranformEntityArrayToObject = <T extends BaseEntity>(
  data: T[]
): Record<string, Omit<T, "id">> => {
  const objectData: Record<string, Omit<T, "id">> = {}

  for (const dataItem of data) {
    const { id, ...rest } = dataItem
    objectData[id] = rest
  }

  return objectData
}

export const areStringEqual = (string1: string, string2: string) =>
  removeAccents(string1)
    .toUpperCase()
    .includes(removeAccents(string2).toUpperCase())

const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
