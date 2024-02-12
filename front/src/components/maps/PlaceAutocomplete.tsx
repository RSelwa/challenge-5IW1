import { useContext, useState, type ReactElement } from "react"
import { Autocomplete } from "@react-google-maps/api"
import type { PlaceData } from "@/types/maps"
import { normalizeMapsPlaceData } from "@/utils/maps"
import { useAppDispatch } from "@/redux/hook"
import { changeSearchPlace } from "@/redux/user/userSlice"
import { GoogleMapsAPIContext } from "@/App"

interface Props {
  children: ReactElement
  changeLocalisation: (localisation: PlaceData) => void
}

const PlaceAutocomplete = ({
  children,
  changeLocalisation
}: Props): JSX.Element => {
  const { isLoaded } = useContext(GoogleMapsAPIContext)
  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>()
  const dispatch = useAppDispatch()

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchResult(autocomplete)
  }

  const onPlaceChanged = () => {
    if (searchResult != null) {
      const normalizedResult = normalizeMapsPlaceData(searchResult.getPlace())
      changeLocalisation(normalizedResult)
      dispatch(changeSearchPlace(normalizedResult))
    }
  }

  if (!isLoaded) {
    return <></>
  }

  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={{
        fields: ["geometry", "address_components", "formatted_address"]
      }}
    >
      {children}
    </Autocomplete>
  )
}

export default PlaceAutocomplete
