import { Link } from "react-router-dom"
import { useAppSelector } from "@/redux/hook"
import AdminLayout from "@/components/Layout/AdminLayout"
import ClientLayout from "@/components/Layout/ClientLayout"
import DefaultLayout from "@/components/Layout/DefaultLayout"
import PracticionerLayout from "@/components/Layout/PracticionerLayout"

const Layout = ({ children }: { children: JSX.Element }) => {
  const userStatus = useAppSelector((state) => state.user.status)
  const layoutHandler = () => {
    switch (userStatus) {
      case "admin":
        return <AdminLayout />
      case "practitioner":
        return <PracticionerLayout />
      case "user":
        return <ClientLayout />
      case "vistitor":
        return <DefaultLayout />

      default:
        return <DefaultLayout />
    }
  }

  return (
    <>
      <div className="flex w-full justify-between bg-neutral-300 px-5 py-4">
        <Link to="/">
          <div>Logo</div>
        </Link>
        {layoutHandler()}
      </div>
      {children}
    </>
  )
}

export default Layout
