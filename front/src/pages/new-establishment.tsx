import React, { useState } from "react"
import { Autocomplete } from "@react-google-maps/api"
import { useParams } from "react-router-dom"
import type { EstablishmentPost } from "@/types/api/establishment"
import { ORGANIZATION_API_ROUTES } from "@/constants/db"
import { postEstablisment } from "@/lib/establishments"
import { normalizeMapsPlaceData } from "@/utils/maps"

const NewEstablisement = () => {
  const { organisationId } = useParams()

  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>()

  const addEstablishment = async () => {
    if (!organisationId) return
    try {
      const NewEstablishment: EstablishmentPost = {
        name: "string",
        address: "string",
        zipCode: "string",
        city: "string",
        country: "string",
        organization: ORGANIZATION_API_ROUTES + "/" + organisationId,
        lat: 0,
        lng: 0
      }

      await postEstablisment(NewEstablishment)
    } catch (error) {
      console.error(error)
    }
  }
  const onPlaceChanged = () => {
    if (searchResult != null) {
      const normalizedResult = normalizeMapsPlaceData(searchResult.getPlace())
      console.log(normalizedResult)

      //   changeLocalisation(normalizedResult)
      //   dispatch(changeSearchPlace(normalizedResult))
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addEstablishment()
      }}
    >
      <Autocomplete
        onLoad={(autocomplete) => setSearchResult(autocomplete)}
        onPlaceChanged={onPlaceChanged}
        // options={{
        //   fields: ["geometry", "address_components", "formatted_address"]
        // }}
      >
        <input
          className="py-1 outline-none placeholder:text-gray-400"
          placeholder="Où ?"
          type="search"
          id="searchInput"
        />
      </Autocomplete>
      <button type="submit">Créer un nouvel établissement</button>
    </form>
  )
}

export default NewEstablisement
