import type { Dispatch, SetStateAction } from "react"
import React, { useEffect, useState } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"
import type { SearchResponse } from "@/lib/search"
import { fetchSearch } from "@/lib/search"
import { fetchData } from "@/utils/db"
import MapComponent from "@/components/maps/MapComponent"
import SearchResult from "@/components/Rows/search/SearchResult"
import SearchButton from "@/components/ui/SearchButton"
import UserTitle from "@/components/ui/UserTitle"

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
      <div className="rounded-b-[3rem] bg-blue-500 pb-2">
        <UserTitle />
        <div className="mx-auto my-8 w-min">
          <SearchButton
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
      <div
        className="mx-auto grid w-10/12 gap-4 py-4"
        style={{ gridTemplateColumns: "2fr 1fr" }}
      >
        <p className="col-span-2 font-bold">{resultsSearch.length} résultats</p>
        <div className=" flex w-full flex-col gap-5 overflow-y-auto p-1 ">
          {
            // Array(14)
            //   .fill(resultsSearch[0])
            resultsSearch.map((search, index) => (
              <SearchResult searchResult={search} key={index} />
            ))
          }
        </div>
        <div className="bg- sticky m-1">
          <Wrapper
            apiKey={import.meta.env.VITE_KEY_GOOGLE_MAPS || ""}
            // render={render}
          >
            <MapComponent center={{ lat: 0, lng: 0 }} zoom={0} />
          </Wrapper>
        </div>
      </div>
    </div>
  )
}

export default Home
