import React from "react"
import type { EmployeesWithId, EstablishmentsWithId } from "@/types/withId"
import type { SearchResponse } from "@/lib/search"
import EmployeeRowSearch from "@/components/Rows/search/EmployeeRowSearch"
import EstablishmentRowSearch from "@/components/Rows/search/EstablishmentRowSearch"

type Props = {
  searchResult: SearchResponse
}

const SearchResult = ({ searchResult }: Props) => {
  return (
    <div className="rounded bg-white p-4 ring-blue-600 hover:ring-2">
      {searchResult.hasOwnProperty("establishment") ? (
        <EmployeeRowSearch employee={searchResult as EmployeesWithId} />
      ) : (
        searchResult.hasOwnProperty("employees") && (
          <EstablishmentRowSearch
            establishment={searchResult as EstablishmentsWithId}
          />
        )
      )}
    </div>
  )
}

export default SearchResult
