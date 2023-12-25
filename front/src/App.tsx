import { useAppSelector } from "@/redux/hook"
import Home from "@/pages/UserHome"
import VisitorHome from "@/pages/VisitorHome"
import { createContext } from "react"
import { useGoogleMapsAPI } from "./config/googleMapsAPI"

export const GoogleMapAPIContext = createContext({ isLoaded: false })

function App() {
  const status = useAppSelector((state) => state.user.status)
  const { isLoaded } = useGoogleMapsAPI()

  return (
    <GoogleMapAPIContext.Provider value={{ isLoaded }}>
      <>{status?.includes("VISTOR") ? <VisitorHome /> : <Home />}</>
    </GoogleMapAPIContext.Provider>
  )
}

export default App