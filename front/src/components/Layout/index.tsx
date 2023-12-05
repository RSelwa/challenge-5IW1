import { Fragment } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import Avatar from "boring-avatars"
import { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"
import type { reduxUserFront } from "@/types/redux/user"
import { useAppSelector } from "@/redux/hook"
import AdminLayout from "@/components/Layout/AdminLayout"
import ClientLayout from "@/components/Layout/ClientLayout"
import VisitorLayout from "@/components/Layout/VisitorLayout"
import { dropdownMenuSideOffset } from "@/constants"

const Layout = ({ children }: { children: JSX.Element }) => {
  const userStatus = useAppSelector(
    (state) => (state.user as reduxUserFront).status
  )

  return (
    <>
      <div className="flex w-full items-center justify-between bg-sky-500 px-5 py-4">
        <Link to="/">
          DOCTOGES
          {/* <Logo className="text-white" size="40" /> */}
        </Link>
        {userStatus.includes("VISTOR") ? (
          <VisitorLayout />
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="group flex items-center gap-2">
              <Avatar
                size={32}
                name="Maya Angelou"
                variant={userStatus.includes("ROLE_ADMIN") ? "marble" : "beam"}
                colors={["#92A1C6", "#146A7C", "#fff", "#C271B4", "#74FFC9"]}
              />
              <ChevronDownIcon
                color="white"
                className="transition-transform group-data-[state=open]:rotate-180"
              />
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={dropdownMenuSideOffset}
                className="DropdownMenuContent text-red-500"
              >
                {userStatus.includes("ROLE_USER") && <ClientLayout />}
                {userStatus.includes("ROLE_ADMIN") && <AdminLayout />}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
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
