import { useAppSelector } from "@/redux/hook"
import Home from "@/pages/UserHome"
import VisitorHome from "@/pages/VisitorHome"
import { createContext } from "react"
import { useGoogleMapsAPI } from "./config/googleMapsAPI"

export const GoogleMapsAPIContext = createContext({ isLoaded: false })

function App() {
  const status = useAppSelector((state) => state.user.status)
  const { isLoaded } = useGoogleMapsAPI()

  return (
    <GoogleMapsAPIContext.Provider value={{ isLoaded }}>
      <>{status?.includes("VISTOR") ? <VisitorHome /> : <Home />}</>
    </GoogleMapsAPIContext.Provider>
  )
}

export default App