import React, { useEffect, useState } from "react"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import { LoaderIcon } from "react-hot-toast"
import type { NotationType } from "@/types/api/notation"
import { EMPLOYEE_API_ROUTES, USER_API_ROUTES } from "@/constants/db"
import { fetchNotations, patchNotation, postNotation } from "@/lib/notations"
import { parseJwt } from "@/utils/redux"
import { Translate } from "react-auto-translate"


type Props = {
  idNotationTarget: string
}
type NotationForm = {
  id?: string
  note: NotationType["note"]
  comment: NotationType["comment"]
}
const Notation = ({ idNotationTarget }: Props) => {
  const { id } = parseJwt(localStorage.getItem("token") || "")
  const [isLoading, setIsLoading] = useState(false)
  const [notation, setNotation] = useState<NotationForm>({
    id: undefined,
    note: 0,
    comment: ""
  })
  const [isExistingNotation, setIsExistingNotation] = useState(false)

  const fetchPotentialNotation = async () => {
    try {
      setIsLoading(true)

      const notations = await fetchNotations()

      const isExistingNote = notations.some(
        (notation) =>
          notation.idNotationFrom.replace(USER_API_ROUTES + "/", "") === id &&
          notation.idNotationTarget.replace(EMPLOYEE_API_ROUTES + "/", "") ===
            idNotationTarget
      )
      setIsExistingNotation(isExistingNote)

      if (isExistingNote) {
        const notation = notations.find(
          (notation) =>
            notation.idNotationFrom.replace(USER_API_ROUTES + "/", "") === id &&
            notation.idNotationTarget.replace(EMPLOYEE_API_ROUTES + "/", "") ===
              idNotationTarget
        )
        if (notation) {
          setNotation({
            id: notation.id,
            comment: notation.comment,
            note: notation.note
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const newNotation: NotationType = {
        note: notation.note,
        comment: notation.comment,
        idNotationTarget: "/api/employees/" + idNotationTarget,
        idNotationFrom: "/api/users/" + id
      }

      if (isExistingNotation && notation.id) {
        console.log("patch", newNotation)

        await patchNotation({ ...newNotation, id: notation.id })
      } else {
        console.log("post", newNotation)

        await postNotation(newNotation)
      }
      fetchPotentialNotation()
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPotentialNotation()
  }, [])

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-3">
        <LoaderIcon />
      </div>
    )
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="flex flex-col gap-2"
    >
      <Typography component="legend"><Translate>Notation</Translate></Typography>
      <Rating
        name="notation"
        value={notation.note}
        onChange={(e, value) =>
          setNotation((prevState) => ({ ...prevState, note: value || 0 }))
        }
      />
      <input
        type="text"
        placeholder="Laisser un commentaire"
        value={notation.comment}
        onChange={(e) => {
          setNotation((prevState) => ({
            ...prevState,
            comment: e.target.value
          }))
        }}
      />
      <button
        className="rounded bg-cyan-500 px-4 py-2 text-center text-white"
        type="submit"
      >
        <Translate>Noter</Translate>
      </button>
    </form>
  )
}
export default Notation
