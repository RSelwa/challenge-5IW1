import type { SyntheticEvent } from "react"
import React, { useEffect, useState } from "react"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import toast from "react-hot-toast"
import type { NotationType } from "@/types/api/notation"
import { NotationtionsWithId } from "@/types/withId"
import { patchNotation, postNotation } from "@/lib/notations"
import { parseJwt } from "@/utils/redux"
import { mockNotation } from "@/mock/notationMock"

type Props = {
  idTarget: string
}
const Notation = ({ idTarget }: Props) => {
  const [notation, setNotation] = useState<NotationtionsWithId>({
    comments: "",
    idFrom: "",
    idTarget: "",
    note: 0,
    id: ""
  })
  const [isExistingNotation, setIsExistingNotation] = useState(false)

  const fetchPotentialNotation = async () => {
    try {
      const token = parseJwt(localStorage.getItem("token") || "")

      // const notations = await fetchNotations()
      token.id = "user444"
      await new Promise((r) => setTimeout(r, 1000))
      const notations = mockNotation

      const isExistingNote = notations.some(
        (notation) =>
          notation.idFrom === token.id && notation.idTarget === idTarget
      )
      setIsExistingNotation(isExistingNote)
      if (isExistingNote) {
        const notation = notations.find(
          (notation) =>
            notation.idFrom === token.id && notation.idTarget === idTarget
        )
        if (notation) {
          setNotation(notation)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = async (event: SyntheticEvent<Element, Event>) => {
    try {
      const token = parseJwt(localStorage.getItem("token") || "")
      const note: number = parseInt((event.target as any).value)
      setNotation((prevState) => ({ ...prevState, note }))

      const newNotation: NotationType = {
        idFrom: token.id,
        idTarget: idTarget,
        comments: "",
        note: note
      }
      throw new Error("TEST")

      if (isExistingNotation) {
        console.log("patch", newNotation)

        await patchNotation({ ...newNotation, id: notation.id })
      } else {
        console.log("post", newNotation)

        await postNotation(newNotation)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  useEffect(() => {
    fetchPotentialNotation()
  }, [])

  return (
    <div>
      <Typography component="legend">Notation</Typography>
      <Rating name="notation" value={notation.note} onChange={onSubmit} />
      <br />
      <input
        type="text"
        placeholder="Laisser un commentaire"
        value={""}
        onChange={() => null}
      />
      <br />
    </div>
  )
}
export default Notation
