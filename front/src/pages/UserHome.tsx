import type { Dispatch, SetStateAction } from "react"
import React, { useState } from "react"
import { fetchSearch } from "@/lib/search"
import { fetchData } from "@/utils/db"
import Map from "@/components/maps/Map"
import SearchResult from "@/components/Rows/search/SearchResult"
import SearchBar from "@/components/ui/SearchBar"
import UserTitle from "@/components/ui/UserTitle"
import type { SearchQuery } from "@/types"
import type { EmployeesWithId } from "@/types/withId"

const Home = () => {
  const [resultsSearch, setResultsSearch] = useState<EmployeesWithId[]>([])
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    service: "",
    localisation: ""
  })

  const submit = (searchQuery: SearchQuery) => {
    console.log(searchQuery)
    fetchData(fetchSearch(), [setResultsSearch] as Dispatch<
      SetStateAction<EmployeesWithId[]>
    >[])
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-blue-100">
      <div className="rounded-b-[3rem] bg-blue-500 pb-2">
        <UserTitle />
        <div className="mx-auto my-8 w-min">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClick={submit}
          />
        </div>
      </div>
      <div
        className="relative mx-auto grid w-11/12 gap-4  py-4"
        style={{ gridTemplateColumns: "2fr 1fr" }}
      >
        <p className="col-span-2 font-bold">{resultsSearch.length} résultats</p>
        <div className=" flex min-h-[200px] w-full flex-col gap-5 overflow-y-auto p-1">
          {resultsSearch.map((search, index) => (
            <SearchResult searchResult={search} key={index} />
          ))}
        </div>
        <Map employeeList={resultsSearch}/>
      </div>
    </div>
  )
}

export default Home
