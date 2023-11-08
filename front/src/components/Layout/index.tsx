import AdminLayout from "@/src/components/Layout/AdminLayout"
import ClientLayout from "@/src/components/Layout/ClientLayout"
import DefaultLayout from "@/src/components/Layout/DefaultLayout"
import PracticionerLayout from "@/src/components/Layout/PracticionerLayout"
import { useAppSelector } from "@/src/redux/hook"

const Layout = ({ children }: { children: JSX.Element }) => {
  const userStatus = useAppSelector((state) => state.user.status)
  const layoutHandler = () => {
    switch (userStatus) {
      case "admin":
        return <AdminLayout />
      case "practitioner":
        return <PracticionerLayout />
      case "client":
        return <ClientLayout />
      case "vistitor":
        return <DefaultLayout />

      default:
        break
    }
  }

  return (
    <>
      <div className="flex w-full justify-between px-5 py-4">
        <div>Logo</div>
        {layoutHandler()}
      </div>
      {children}
    </>
  )
}

export default Layout
