import { GoogleMapsAPIContext } from "@/App"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { changeSearchPlace } from "@/redux/user/userSlice"
import { normalizeMapsPlaceData } from "@/utils/maps"
 import { Autocomplete } from "@react-google-maps/api"
import { type ReactElement, useContext, useState, useEffect } from "react"

interface Props {
  children: ReactElement
}

const PlaceAutocomplete = ({ children }: Props): JSX.Element => {
  const { isLoaded } = useContext(GoogleMapsAPIContext)
  const [ searchResult, setSearchResult ] = useState<google.maps.places.Autocomplete>()
  const currentPlace = useAppSelector((state) => state.user.searchPlace)
  const dispatch = useAppDispatch()

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchResult(autocomplete)
  }
  
  const onPlaceChanged = () => {
    if (searchResult != null) {
      const normalizedResult = normalizeMapsPlaceData(searchResult.getPlace())
      dispatch(changeSearchPlace(normalizedResult))
    }
  }

  useEffect(() => {
    console.log(currentPlace)
  }, [ currentPlace ])

  if (!isLoaded) {
    return <></>
  }

  return (
    <Autocomplete 
      onLoad={onLoad} 
      onPlaceChanged={onPlaceChanged} 
      options={{ 
        fields: ['geometry', 'address_components', 'formatted_address'] 
      }}
    >
      {children}
    </Autocomplete>
  )
}

export default PlaceAutocomplete