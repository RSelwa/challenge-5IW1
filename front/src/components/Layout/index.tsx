import { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import Avatar from "boring-avatars"
import { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"
import { useAppSelector } from "@/redux/hook"
import Logo from "@/components/icons/logo"
import AdminLayout from "@/components/Layout/AdminLayout"
import ClientLayout from "@/components/Layout/ClientLayout"
import PracticionerLayout from "@/components/Layout/PracticionerLayout"
import VisitorLayout from "@/components/Layout/VisitorLayout"

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
        return <VisitorLayout />

      default:
        return <VisitorLayout />
    }
  }
  // console.log(Avatar)

  return (
    <>
      <div className="flex w-full items-center justify-between bg-sky-500 px-5 py-4">
        <Link to="/">
          <Logo className="text-white" size="40" />
        </Link>
        {userStatus === "vistitor" ? (
          layoutHandler()
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="group flex items-center gap-2">
              <Avatar
                size={32}
                name="Maria Mitchell"
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <ChevronDownIcon
                color="white"
                className="transition-transform group-data-[state=open]:rotate-180"
              />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>{layoutHandler()}</DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}
      </div>
      {children}
    </>
  )
}

export default Layout

export const GetLayout = (element: JSX.Element): JSX.Element => (
  <Layout>
    <Fragment>
      {element}
      <Toaster position="bottom-right" />
    </Fragment>
  </Layout>
)
