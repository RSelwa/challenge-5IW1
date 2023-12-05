import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import type { EmployeesWithId, EstablishmentsWithId } from "@/types/withId"
import type { SearchResponse } from "@/lib/search"
import { fetchSearch } from "@/lib/search"
import { fetchData } from "@/utils/db"
import EmployeeRowSearch from "@/components/Rows/search/EmployeeRowSearch"
import EstablishmentRowSearch from "@/components/Rows/search/EstablishmentRowSearch"

const Home = () => {
  const [resultsSearch, setResultsSearch] = useState<SearchResponse>([])
  const [resultsSearchFiltered, setResultsSearchFiltered] =
    useState<SearchResponse>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchData(fetchSearch(), [
      setResultsSearch,
      setResultsSearchFiltered
    ] as Dispatch<SetStateAction<SearchResponse>>[])
  }, [])

  return (
    <div>
      <h1>Test</h1>
      {resultsSearchFiltered.map((search, index) => (
        <div key={index}>
          {search.hasOwnProperty("establishment") ? (
            <EmployeeRowSearch employee={search as EmployeesWithId} />
          ) : (
            search.hasOwnProperty("employees") && (
              <EstablishmentRowSearch
                establishment={search as EstablishmentsWithId}
              />
            )
          )}
        </div>
      ))}
      <input type="search" onChange={(e) => setSearchQuery(e.target.value)} />

      <button type="button" onClick={() => console.log(searchQuery)}>
        test
      </button>
    </div>
  )
}

export default Home
