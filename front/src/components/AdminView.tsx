import React, { Fragment, useEffect, useState } from "react"
import type { HeaderTable } from "@/types/table"
import { fetchData } from "@/utils/db"
import Table from "@/components/Table"
import BackButton from "@/components/ui/BackButton"

type Props<T> = {
  promiseFetch: () => Promise<T[]>
  header: HeaderTable[]
  Rows: React.FC<{ data: T }>
}

const AdminView = <T,>({ promiseFetch, header, Rows }: Props<T>) => {
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    fetchData(promiseFetch(), setData)
  }, [])

  return (
    <Fragment>
      <BackButton />
      <Table header={header} Rows={Rows} dataT={data} />
    </Fragment>
  )
}

export default AdminView
