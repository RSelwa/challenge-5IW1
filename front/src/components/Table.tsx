import type { ChangeEvent } from "react"
import React, { useRef } from "react"
import type { HeaderTable, RowProps } from "@/types/table"
import { cn } from "@/utils"

type Props<T> = {
  header: HeaderTable[]
  rows: React.FC<T>
  dataT?: any
}
const Table = <T,>({ header, rows, dataT }: Props<T>) => {
  const checkboxRef = useRef<HTMLInputElement>(null)

  const toggleGlobalSelect = ({
    target: { indeterminate, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    console.log("selected")

    // dispatch(updateSelectedList(checked && !indeterminate ? listRows : []))
  }

  return (
    <div>
      <table className="w-full table-fixed rounded-t-lg bg-neutral-50">
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
                  {item?.withCheckbox && (
                    <input
                      type="checkbox"
                      ref={checkboxRef}
                      onChange={toggleGlobalSelect}
                    />
                  )}
                  {item.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {/* <row
            dataT={dataT}
            ColumnNumber={header.length}
            RowComponent={rows}
            organizationList={organizationList}
          /> */}
          {dataT.map(
            (row) => rows
            // <tr>
            //   <td>
            //     {" "}
            //     <input type="checkbox" name="" id="" /> {row.id}
            //   </td>
            //   <td>{row.email}</td>
            // </tr> //! Ma row user?
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
