import type { Dispatch, SetStateAction } from "react"
import React from "react"
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
  SewingPinIcon
} from "@radix-ui/react-icons"

type Props = {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const SearchButton = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <div className="flex w-fit items-center rounded-full bg-white ring-4 ring-white  ">
      <div className="flex h-full items-center gap-1 rounded-l-full  border-r-2 border-gray-200 pl-4 text-base ">
        <label className="cursor-text" htmlFor="searchInput">
          <MagnifyingGlassIcon color="gray" strokeWidth="10" />
        </label>
        <input
          className="min-w-[300px] px-0 py-1 outline-none placeholder:text-gray-400"
          placeholder="Nom, spécialité, établissement,..."
          type="search"
          id="searchInput"
          onChange={(e) => setSearchQuery(e.target.value)}
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button
        className="group flex items-center gap-3 rounded-r-full bg-blue-950 px-4  py-1 text-end text-white hover:bg-blue-700"
        type="button"
        onClick={() => console.log(searchQuery)}
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
