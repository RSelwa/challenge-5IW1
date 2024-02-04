import { useEffect, useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import Avatar from "boring-avatars"
import { Translator } from "react-auto-translate"
import { Link, useNavigate } from "react-router-dom"
import type { reduxUserFront } from "@/types/redux/user"
import { useAppSelector } from "@/redux/hook"
import FrenchFlag from "@/components/icons/fr"
import GrandFuckigBritain from "@/components/icons/gb"
import AdminLayout from "@/components/Layout/AdminLayout"
import ClientLayout from "@/components/Layout/ClientLayout"
import VisitorLayout from "@/components/Layout/VisitorLayout"
import { dropdownMenuSideOffset } from "@/constants"

const Layout = ({
  children,
  adminSecurity
}: {
  children: JSX.Element
  adminSecurity: boolean
}) => {
  const navigate = useNavigate()
  const [langage, setLangage] = useState<"fr" | "en">("fr")
  const userStatus = useAppSelector(
    (state) => (state.user as reduxUserFront).status
  )
  useEffect(() => {
    if (!userStatus?.includes("ROLE_ADMIN") && adminSecurity) navigate("/")
  }, [])

  return (
    <Translator
      from="fr"
      to={langage}
      googleApiKey={import.meta.env.VITE_KEY_GOOGLE_MAPS}
    >
      <div className="flex w-full items-center justify-between bg-blue-500 px-5 py-4">
        <Link to="/">
          <h1 className="font-black italic tracking-widest text-white">
            DOCTOGES
          </h1>
        </Link>
        {userStatus?.includes("VISTOR") ? (
          <VisitorLayout />
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="group flex items-center gap-2">
              <Avatar
                size={32}
                name="Maya Angelou"
                variant={userStatus?.includes("ROLE_ADMIN") ? "marble" : "beam"}
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
                {userStatus?.includes("ROLE_USER") && <ClientLayout />}
                {userStatus?.includes("ROLE_ADMIN") && <AdminLayout />}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}
      </div>
      {children}
      <label
        htmlFor="langage"
        className="absolute bottom-4 right-4 z-50 cursor-pointer rounded-full"
      >
        {langage === "fr" ? <FrenchFlag /> : <GrandFuckigBritain />}
      </label>
      <input
        id="langage"
        type="checkbox"
        className="hidden"
        onChange={(e) => {
          if (e.target.checked) setLangage("en")
          if (!e.target.checked) setLangage("fr")
        }}
      />
    </Translator>
  )
}

export default Layout
