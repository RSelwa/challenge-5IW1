import React, { useState } from "react"
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import type { EstablishmentPost } from "@/types/api/establishment"
import { ORGANIZATION_API_ROUTES } from "@/constants/db"
import { defaultLocation } from "@/constants/maps"
import { postEstablisment } from "@/lib/establishments"
import { normalizeMapsPlaceData } from "@/utils/maps"

const NewEstablisement = () => {
  const { organisationId } = useParams()
  const navigate = useNavigate()

  const [geometry, setGeometry] = useState<{ lat: number; lng: number }>()
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>()

  const { register, setValue, handleSubmit } = useForm<EstablishmentPost>({
    defaultValues: {
      organization: ORGANIZATION_API_ROUTES + "/" + organisationId
    }
  })

  const addEstablishment = async (data: EstablishmentPost) => {
    try {
      await postEstablisment(data)
      navigate("/mon-organisation")
    } catch (error) {
      console.error(error)
    }
  }
  const onPlaceChanged = () => {
    if (searchResult != null) {
      const { address_components, name } = searchResult.getPlace()
      const {
        geometry: { lat, lng }
      } = normalizeMapsPlaceData(searchResult.getPlace())
      if (!address_components) return
      const postal_code = getDataFromAdress(address_components, "postal_code")
      const country = getDataFromAdress(address_components, "country")
      const city = getDataFromAdress(address_components, "locality")
      setValue("address", name || "")
      setValue("country", country || "")
      setValue("city", city || "")
      setValue("zipCode", postal_code || "")
      setValue("lat", lat || defaultLocation.lat)
      setValue("lng", lng || defaultLocation.lng)
      setGeometry({ lat, lng })
    }
  }
  const getDataFromAdress = (
    data: google.maps.GeocoderAddressComponent[],
    target: "postal_code" | "country" | "locality"
  ) => {
    return data.find((component) => component.types.includes(target))?.long_name
  }
  return (
    <form
      onSubmit={handleSubmit(addEstablishment)}
      className="grid grid-cols-2 gap-4 p-4"
    >
      <div className="space-y-4">
        <input
          required
          type="text"
          {...register("name")}
          placeholder="Nom de l'établissement"
        />
        <input
          type="text"
          {...register("address")}
          disabled
          placeholder="Adresse (généré automatiqement)"
        />
        <input
          type="text"
          {...register("city")}
          disabled
          placeholder="Ville (généré automatiqement)"
        />
        <input
          type="text"
          {...register("country")}
          disabled
          placeholder="Pays (généré automatiqement)"
        />
        <input
          type="text"
          {...register("zipCode")}
          disabled
          placeholder="Code postal (généré automatiqement)"
        />
        <button
          type="submit"
          className="rounded bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Créer un nouvel établissement
        </button>
      </div>
      <div className="space-y-4">
        <Autocomplete
          onLoad={(autocomplete) => setSearchResult(autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            className="w-full px-3 py-1 outline-none placeholder:text-gray-400"
            placeholder="Où ?"
            type="search"
            id="searchInput"
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "600px"
          }}
          center={geometry}
          zoom={14}
          options={{
            streetViewControl: false,
            mapTypeControl: false
          }}
        >
          {geometry && <Marker position={geometry} />}
        </GoogleMap>
      </div>
    </form>
  )
}

export default NewEstablisement
