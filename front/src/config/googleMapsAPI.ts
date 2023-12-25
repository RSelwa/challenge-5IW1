import { placesLibrary } from "@/constants/maps";
import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMapsAPI = () => useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: import.meta.env.VITE_KEY_GOOGLE_MAPS,
  libraries: placesLibrary
})
