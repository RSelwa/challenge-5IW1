import React from "react"
import type { HeaderTable } from "@/types/table"
import { cn } from "@/utils"

type Props<T> = {
  header: HeaderTable[]
  Rows: React.FC<{ data: T }>
  dataT?: any
}
const Table = <T,>({ header, Rows, dataT }: Props<T>) => {
  return (
    <table className="mx-auto w-10/12 table-fixed rounded-t-lg bg-neutral-50">
      <colgroup>
        {header.map(({ width }, index: number) => (
          <col key={index} style={{ width }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {header.map((item: HeaderTable, index: number) => (
            <th
              key={index}
              className={cn(
                "sticky top-0 z-10 bg-neutral-50 py-[15px] pl-2 text-left text-xs font-normal leading-3 text-neutral-300 first:rounded-tl-lg last:rounded-tr-lg"
              )}
            >
              <span className="inline-flex items-center gap-2">
                {item.title}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {dataT.map((row: T, index: number) => (
          <Rows key={index} data={row} />
        ))}
      </tbody>
    </table>
  )
}

export default Table
