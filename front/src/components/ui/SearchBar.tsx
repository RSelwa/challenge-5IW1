import type { Dispatch, SetStateAction } from "react"
import React from "react"
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  SewingPinIcon
} from "@radix-ui/react-icons"
import { usePlacesWidget } from "react-google-autocomplete"
import type { SearchQuery } from "@/types"

type Props = {
  searchQuery: SearchQuery
  setSearchQuery: Dispatch<SetStateAction<SearchQuery>>
  onClick: (searchQuery: SearchQuery) => void
}

const SearchButton = ({ searchQuery, setSearchQuery, onClick }: Props) => {
  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_KEY_GOOGLE_MAPS,
    onPlaceSelected: (place) => {
      const newLocalisation =
        place.address_components && place.address_components.length > 0
          ? place.address_components[0].long_name
          : ""
      setSearchQuery((prevState) => ({
        ...prevState,
        localisation: newLocalisation
      }))
    }
  })
  return (
    <div className="flex w-fit items-center rounded-full bg-white  ring-4 ring-white  ">
      <div className="flex h-full items-center gap-1 rounded-l-full  border-r-2 border-gray-200 pl-4 text-base ">
        <label className="cursor-text" htmlFor="searchInput">
          <MagnifyingGlassIcon color="gray" strokeWidth="10" />
        </label>
        <input
          className="min-w-[300px] px-0 py-1 outline-none placeholder:text-gray-400"
          placeholder="Nom, spécialité, établissement,..."
          type="search"
          id="searchInput"
          onChange={(e) =>
            setSearchQuery((prevState) => ({
              ...prevState,
              service: e.target.value
            }))
          }
        />
      </div>
      <div className="flex h-full items-center gap-1 pl-4">
        <label className="cursor-text" htmlFor="searchInput">
          <SewingPinIcon color="gray" strokeWidth="10" />
        </label>
        <input
          className="py-1 outline-none placeholder:text-gray-400"
          placeholder="Où ?"
          type="search"
          id="searchInput"
          onChange={(e) =>
            setSearchQuery((prevState) => ({
              ...prevState,
              localisation: e.target.value
            }))
          }
          ref={ref}
        />
      </div>

      <button
        className="group flex items-center gap-3 rounded-r-full bg-blue-950 px-4  py-1 text-end text-white hover:bg-blue-700"
        type="button"
        onClick={() => onClick(searchQuery)}
      >
        Rechercher{" "}
        <ChevronRightIcon
          strokeOpacity={0}
          className="transition-transform duration-[1s] group-hover:translate-x-px"
        />
      </button>
    </div>
  )
}

export default SearchButton
