import type { SyntheticEvent } from "react"
import React, { useEffect, useState } from "react"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import toast, { LoaderIcon } from "react-hot-toast"
import type { NotationType } from "@/types/api/notation"
import { fetchNotations, patchNotation, postNotation } from "@/lib/notations"
import { parseJwt } from "@/utils/redux"

type Props = {
  idTarget: string
}
type NotationForm = {
  note: NotationType["note"]
  comments: NotationType["comments"]
}
const Notation = ({ idTarget }: Props) => {
  const { id } = parseJwt(localStorage.getItem("token") || "")
  const [isLoading, setIsLoading] = useState(false)
  const [notation, setNotation] = useState<NotationForm>({
    note: 0,
    comments: ""
  })
  const [isExistingNotation, setIsExistingNotation] = useState(false)

  const fetchPotentialNotation = async () => {
    try {
      setIsLoading(true)

      const notations = await fetchNotations()

      const isExistingNote = notations.some(
        (notation) => notation.idFrom === id && notation.idTarget === idTarget
      )
      setIsExistingNotation(isExistingNote)

      if (isExistingNote) {
        const notation = notations.find(
          (notation) => notation.idFrom === id && notation.idTarget === idTarget
        )
        if (notation)
          setNotation({
            comments: notation.comments,
            note: notation.note
          })
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
        idFrom: id,
        idTarget: idTarget,
        comments: notation.comments,
        note: notation.note
      }
      // throw new Error("TEST")

      if (isExistingNotation) {
        console.log("patch", newNotation)

        // await patchNotation({ ...newNotation, id: notation.id })
      } else {
        console.log("post", newNotation)

        await postNotation(newNotation)
      }
      fetchPotentialNotation()
    } catch (error) {
      console.log(error)

      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPotentialNotation()
  }, [])

  if (isLoading) return <LoaderIcon />
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <Typography component="legend">Notation</Typography>
      <Rating
        name="notation"
        value={notation.note}
        onChange={(e, value) =>
          setNotation((prevState) => ({ ...prevState, note: value || 0 }))
        }
      />
      <br />
      <input
        type="text"
        placeholder="Laisser un commentaire"
        value={notation.comments}
        onChange={(e) =>
          setNotation((prevState) => ({
            ...prevState,
            comments: e.target.value
          }))
        }
      />
      <br />
      <button type="submit">Noter</button>
    </form>
  )
}
export default Notation
