export interface Table<T> {
  header: HeaderTable[]
  rows: RowProps<T>[]
}

export interface HeaderTable {
  title: string
  columnClass?: string
  search?: string
  withCheckbox?: boolean
  widthColumn?: `w-[${number}%]`
  width?: `${number}%` | `${number}px`
}

export type RowProps<T> = {
  data: T
}
