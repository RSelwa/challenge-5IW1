import { createContext } from "react"
import { useAppSelector } from "@/redux/hook"
import Home from "@/pages/UserHome"
import VisitorHome from "@/pages/VisitorHome"

export const GoogleMapsAPIContext = createContext({ isLoaded: false })

function App() {
  const status = useAppSelector((state) => state.user.status)

  return <>{status?.includes("VISTOR") ? <VisitorHome /> : <Home />}</>
}

export default App
