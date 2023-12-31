import { useAppSelector } from "@/redux/hook"
import Home from "@/pages/UserHome"
import VisitorHome from "@/pages/VisitorHome"

function App() {
  const status = useAppSelector((state) => state.user.status)

  return <>{status.includes("VISTOR") ? <VisitorHome /> : <Home />}</>
}

export default App
