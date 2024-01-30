import type { Dispatch, SetStateAction } from "react"
import React from "react"
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  SewingPinIcon
} from "@radix-ui/react-icons"
import type { SearchQuery } from "@/types"
import PlaceAutocomplete from "../maps/PlaceAutocomplete"

type Props = {
  searchQuery: SearchQuery
  setSearchQuery: Dispatch<SetStateAction<SearchQuery>>
  onSubmitForm: (searchQuery: SearchQuery) => void
}

const SearchBar = ({ searchQuery, setSearchQuery, onSubmitForm }: Props) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmitForm(searchQuery)
      }}
      className="flex w-fit items-center rounded-full bg-white  ring-4 ring-white  "
    >
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
      <div className="flex h-full items-center gap-1 border-r-2 border-gray-200 pl-4">
        <label className="cursor-text" htmlFor="searchInput">
          <SewingPinIcon color="gray" strokeWidth="10" />
        </label>
        <PlaceAutocomplete
          changeLocalisation={(newLocalisation) =>
            setSearchQuery((prevState) => ({
              ...prevState,
              localisation: newLocalisation
            }))
          }
        >
          <input
            className="py-1 outline-none placeholder:text-gray-400"
            placeholder="Où ?"
            type="search"
            id="searchInput"
          />
        </PlaceAutocomplete>
      </div>
      <select
        defaultValue={5}
        onChange={(e) =>
          setSearchQuery((prevState) => ({
            ...prevState,
            radiusInKm: parseInt(e.target.value)
          }))
        }
      >
        <option value={1}>1 Km</option>
        <option value={5}>5 Km</option>
        <option value={10}>10 Km</option>
        <option value={999999}>No limit</option>
      </select>
      <button
        className="group flex items-center gap-3 rounded-r-full bg-blue-950 px-4  py-1 text-end text-white hover:bg-blue-700"
        type="submit"
      >
        Rechercher
        <ChevronRightIcon
          strokeOpacity={0}
          className="transition-transform duration-[1s] group-hover:translate-x-px"
        />
      </button>
    </form>
  )
}

export default SearchBar
