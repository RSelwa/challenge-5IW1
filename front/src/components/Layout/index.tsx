import { useEffect, useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import Avatar from "boring-avatars"
import { Translator } from "react-auto-translate"
import { Link, useNavigate } from "react-router-dom"
import { parseJwt } from "@/utils/redux"
import FrenchFlag from "@/components/icons/fr"
import GrandFuckigBritain from "@/components/icons/gb"
import AdminLayout from "@/components/Layout/AdminLayout"
import ClientLayout from "@/components/Layout/ClientLayout"
import EmployeeLayout from "@/components/Layout/EmployeeLayout"
import OrganisationLayout from "@/components/Layout/OrganisationLayout"
import VisitorLayout from "@/components/Layout/VisitorLayout"
import { GoogleMapsAPIContext } from "@/App"
import { useGoogleMapsAPI } from "@/config/googleMapsAPI"
import { AVATAR_COLORS } from "@/constants"

const Layout = ({
  children,
  adminSecurity
}: {
  children: JSX.Element
  adminSecurity: boolean
}) => {
  const { isLoaded } = useGoogleMapsAPI()

  const navigate = useNavigate()
  const [langage, setLangage] = useState<"fr" | "en">("fr")
  const { roles } =
    parseJwt(localStorage.getItem("token")?.replaceAll('"', "") || "") || []
  useEffect(() => {
    if (!roles?.includes("ROLE_ADMIN") && adminSecurity) navigate("/")
  }, [])

  return (
    <Translator
      from="fr"
      to={langage}
      googleApiKey={import.meta.env.VITE_KEY_GOOGLE_MAPS}
    >
      <GoogleMapsAPIContext.Provider value={{ isLoaded }}>
        <div className="flex w-full items-center justify-between bg-blue-500 px-5 py-4">
          <Link to="/">
            <h1 className="font-black italic tracking-widest text-white">
              DOCTOGES
            </h1>
          </Link>
          {!localStorage.getItem("token") ? (
            <VisitorLayout />
          ) : (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="group flex items-center gap-2">
                <Avatar
                  size={32}
                  variant="beam"
                  name={AVATAR_COLORS[roles[0]].name}
                  colors={AVATAR_COLORS[roles[0]].color}
                />
                <ChevronDownIcon
                  color="white"
                  className="transition-transform group-data-[state=open]:rotate-180"
                />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="absolute -right-5 top-0 z-10 w-52 space-y-3 rounded-md bg-white p-2 font-bold text-red-500 shadow-md">
                  {roles?.includes("ROLE_USER") && <ClientLayout />}
                  {roles?.includes("ROLE_ADMIN") && <AdminLayout />}
                  {roles?.includes("ROLE_ORGANIZATION") && (
                    <OrganisationLayout />
                  )}
                  {roles?.includes("ROLE_EMPLOYEE") && <EmployeeLayout />}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>

        {children}
        <label
          htmlFor="langage"
          className="fixed bottom-4 right-4 z-50 cursor-pointer rounded-full"
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
      </GoogleMapsAPIContext.Provider>
    </Translator>
  )
}

export default Layout
