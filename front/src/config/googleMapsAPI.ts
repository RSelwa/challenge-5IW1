import { placesLibrary } from "@/constants/maps";
import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMapsAPI = () => useJsApiLoader({
  googleMapsApiKey: import.meta.env.VITE_KEY_GOOGLE_MAPS,
  libraries: placesLibrary
})
