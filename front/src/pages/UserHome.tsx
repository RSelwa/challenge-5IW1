import type { Dispatch, SetStateAction } from "react"
import React, { useState } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"
import type { SearchResponse } from "@/lib/search"
import { fetchSearch } from "@/lib/search"
import { fetchData } from "@/utils/db"
import MapComponent from "@/components/maps/MapComponent"
import SearchResult from "@/components/Rows/search/SearchResult"
import SearchButton from "@/components/ui/SearchBar"
import UserTitle from "@/components/ui/UserTitle"
import type { SearchQuery } from "@/types"

const Home = () => {
  const [resultsSearch, setResultsSearch] = useState<SearchResponse[]>([])

  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    service: "",
    localisation: ""
  })

  const submit = (searchQuery: SearchQuery) => {
    console.log(searchQuery)
    fetchData(fetchSearch(), [setResultsSearch] as Dispatch<
      SetStateAction<SearchResponse[]>
    >[])
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-blue-100">
      <div className="rounded-b-[3rem] bg-blue-500 pb-2">
        <UserTitle />
        <div className="mx-auto my-8 w-min">
          <SearchButton
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
        <Wrapper apiKey={import.meta.env.VITE_KEY_GOOGLE_MAPS || ""}>
          <MapComponent />
        </Wrapper>
      </div>
    </div>
  )
}

export default Home
