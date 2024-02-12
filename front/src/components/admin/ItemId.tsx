import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { DataKeyLink } from "@/types/admin"
import { fetchData } from "@/utils/db"
import Edit from "@/components/admin/Edit"
import BackButton from "@/components/ui/BackButton"

type Props<T> = {
  fetchItem: (id: string) => Promise<T>
  dataKeyException: string[]
  dataKeyLink?: DataKeyLink
  editFunctions: (data: T) => Promise<void>
  route: string
}

const ItemId = <T,>({
  fetchItem,
  dataKeyException,
  editFunctions,
  dataKeyLink,
  route
}: Props<T>) => {
  const { id } = useParams()
  const [item, setItem] = useState<T>()

  useEffect(() => {
    fetchData(fetchItem(id || ""), setItem as Dispatch<SetStateAction<T>>)
  }, [])

  if (!item) return <LoaderIcon />
  return (
    <div>
      <BackButton />
      <Edit
        onSubmit={editFunctions}
        data={item}
        dataKeyException={dataKeyException}
        dataKeyLink={dataKeyLink}
        id={id || ""}
        route={route}
      />
    </div>
  )
}

export default ItemId
