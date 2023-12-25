import { GoogleMapAPIContext } from "@/App"
import { Autocomplete } from "@react-google-maps/api"
import { type ReactElement, useContext, useState } from "react"

interface Props {
  children: ReactElement
}

const PlaceAutocomplete = ({ children }: Props): JSX.Element => {
  const { isLoaded } = useContext(GoogleMapAPIContext)
  const [ searchResult, setSearchResult] = useState<google.maps.places.Autocomplete>()
  
  const onPlaceChanged = () => {
    console.log("enter search result")
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;

      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    }
  }

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setSearchResult(autocomplete)
  }

  if (!isLoaded) {
    return <></>
  }

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      {children}
    </Autocomplete>
  )
}

export default PlaceAutocomplete