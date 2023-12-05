import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import type { EmployeesWithId, EstablishmentsWithId } from "@/types/withId"
import { servicesList } from "@/constants/utils"
import type { SearchResponse } from "@/lib/search"
import { fetchSearch } from "@/lib/search"
import { fetchData } from "@/utils/db"
import EmployeeRowSearch from "@/components/Rows/search/EmployeeRowSearch"
import EstablishmentRowSearch from "@/components/Rows/search/EstablishmentRowSearch"
import SearchButton from "@/components/ui/SearchButton"
import { getRandomInt } from "@/utils"

const Home = () => {
  const [count, setCount] = useState<number>(0)
  const [resultsSearch, setResultsSearch] = useState<SearchResponse>([])
  const [resultsSearchFiltered, setResultsSearchFiltered] =
    useState<SearchResponse>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchData(fetchSearch(), [
      setResultsSearch,
      setResultsSearchFiltered
    ] as Dispatch<SetStateAction<SearchResponse>>[])

    const interval = setInterval(
      () => setCount(getRandomInt(0, servicesList.length - 1)),
      3000
    )
    return () => clearInterval(interval)
  }, [])
  const resetSearch = () => {
    setResultsSearchFiltered(resultsSearch)
  }

  return (
    <div className="bg-sky-500">
      <h1 className="font-6xl text-center font-black text-white">
        Trouvez un rendez-vous avec
        <br />
        <span className="text-blue-200">{servicesList[count]}</span>
      </h1>
      <div className="mx-auto my-8 w-min">
        <SearchButton
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
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
      <button onClick={resetSearch}>Reset</button>
    </div>
  )
}

export default Home
