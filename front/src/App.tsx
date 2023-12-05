import { useAppSelector } from "@/redux/hook"
import AdminHome from "@/pages/AdminHome"
import Home from "@/pages/UserHome"
import VisitorHome from "@/pages/VisitorHome"

function App() {
  const status = useAppSelector((state) => state.user.status)

  return (
    <>
      {status.includes("ROLE_ADMIN") && <AdminHome />}
      {status.includes("VISTOR") && <VisitorHome />}
      {status.includes("ROLE_USER") && <Home />}
    </>
  )
}

export default App
