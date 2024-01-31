import type { ReactNode } from "react"
import React from "react"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { LoaderIcon } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

type Props = {
  isLoading: boolean
  children: ReactNode
  label: string
}

const ReservationsPannel = ({ isLoading, children, label }: Props) => {
  const navigate = useNavigate()

  return (
    <main className="mx-auto mt-4 flex w-11/12 flex-col gap-4 rounded bg-white px-12 py-10 md:w-8/12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold"
      >
        <ArrowLeftIcon className="size-4" /> Étape précédente
      </button>
      <section className="text-sm font-bold">{label}</section>
      {isLoading && (
        <span className="flex scale-150 items-center justify-center">
          <LoaderIcon />
        </span>
      )}
      {children}
    </main>
  )
}

export default ReservationsPannel
