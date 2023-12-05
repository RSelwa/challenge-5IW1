import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import type { SearchResponse } from "@/lib/search"
import { fetchSearch } from "@/lib/search"
import { fetchData } from "@/utils/db"
import SearchResult from "@/components/Rows/search/SearchResult"
import SearchButton from "@/components/ui/SearchButton"
import UserTittle from "@/components/ui/UserTittle"

const Home = () => {
  const [resultsSearch, setResultsSearch] = useState<SearchResponse[]>([])

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchData(fetchSearch(), [setResultsSearch] as Dispatch<
      SetStateAction<SearchResponse[]>
    >[])
  }, [])

  return (
    <div className="bg-blue-100">
      <div className="rounded-b-[3rem] bg-sky-500 pb-2">
        <UserTittle />
        <div className="mx-auto my-8 w-min">
          <SearchButton
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      <div className="mx-auto flex w-10/12 flex-col gap-5 py-4 ">
        <p className="font-bold">{resultsSearch.length} résultats</p>
        {resultsSearch.map((search, index) => (
          <SearchResult searchResult={search} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Home
