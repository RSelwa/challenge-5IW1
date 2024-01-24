import React from "react"
import type { EmployeesWithId } from "@/types/withId"
import EmployeeRowSearch from "@/components/Rows/search/EmployeeRowSearch"

type Props = {
  searchResult: EmployeesWithId
}

const SearchResult = ({ searchResult }: Props) => {
  return (
    <div className="rounded bg-white p-4 ring-blue-600 hover:ring-2">
      <EmployeeRowSearch employee={searchResult} />
    </div>
  )
}

export default SearchResult
