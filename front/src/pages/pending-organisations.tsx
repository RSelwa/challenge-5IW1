import React, { useEffect, useState } from "react"
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import { Translate } from "react-auto-translate"
import { LoaderIcon } from "react-hot-toast"
import type { OrganizationsWithId } from "@/types/withId"
import { editOrganization, fetchOrganizations } from "@/lib/organizations"

const PendingOrganizations = () => {
  const [organisation, setOrganisation] = useState<OrganizationsWithId[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchOrganisations = async () => {
    setIsLoading(true)

    try {
      const orga = await fetchOrganizations()
      setOrganisation(orga.filter((o) => o.status === "PENDING"))
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const handleValidation = async (validate: boolean, id: string) => {
    try {
      setIsLoading(true)
      await editOrganization({ id, status: validate ? "ACCEPTED" : "REFUSED" })
      fetchOrganisations()
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchOrganisations()
  }, [])

  return (
    <div className="space-y-6 p-8">
      <h1 className="font-bold">
        <Translate>Organisation en attente</Translate>
      </h1>
      {isLoading ? (
        <LoaderIcon />
      ) : (
        <div className="">
          {organisation.map((orga, i) => (
            <div
              key={i}
              data-state={
                i === 0
                  ? "first"
                  : i === organisation.length - 1
                  ? "last"
                  : "middle"
              }
              className="flex justify-between border p-4 text-gray-800 transition-all hover:bg-hover data-[state=first]:rounded-t-lg data-[state=last]:rounded-b-lg data-[state=first]:border-b-0 data-[state=middle]:border-b-0 data-[state=first]:border-gray-200 data-[state=last]:border-gray-200 data-[state=middle]:border-gray-200"
            >
              <p>{orga.name}</p>
              {isLoading ? (
                <LoaderIcon />
              ) : (
                <div className="flex gap-2">
                  <button
                    className="size-6 flex items-center justify-center bg-green-500 text-white"
                    onClick={() => handleValidation(true, orga.id)}
                    type="button"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    className="size-6 flex items-center justify-center rounded bg-red-500 text-white"
                    onClick={() => handleValidation(true, orga.id)}
                    type="button"
                  >
                    <Cross2Icon />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PendingOrganizations
