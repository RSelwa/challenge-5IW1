import React from "react"
import type { HeaderTable, RowProps } from "@/types/table"

type Props<T> = {
  header: HeaderTable[]
  rows: React.FC<RowProps<T>> | any
  dataT?: any
}
const Table = <T,>({ header, rows, dataT }: Props<T>) => {
  return <div>Table</div>
}

export default Table
