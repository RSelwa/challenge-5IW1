import React, { useEffect, useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import { LoaderIcon } from "react-hot-toast"
import { Link } from "react-router-dom"
import type { OrganizationsWithId } from "@/types/withId"
import { fetchOrganization } from "@/lib/organizations"
import { parseJwt } from "@/utils/redux"

const MyOrganisation = () => {
  const { id } = parseJwt(localStorage.getItem("token") || "")
  const [isLoading, setIsLoading] = useState(false)
  const [organisation, setOrganisation] = useState<OrganizationsWithId>()

  const fechMyOrga = async () => {
    setIsLoading(true)
    try {
      const orga = await fetchOrganization(id)
      setOrganisation(orga)
      console.log(orga.establishments)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fechMyOrga()
  }, [])

  return (
    <main
      data-status={organisation?.status}
      className="mx-auto mt-12 w-10/12 rounded-lg bg-white p-8 ring data-[status=PENDING]:ring-orange-500 data-[status=REFUSED]:ring-red-500 data-[status=VALIDATED]:ring-green-500"
    >
      <h1 className="mb-4 text-xl font-bold">Mon organisation</h1>
      {isLoading && !organisation && (
        <div className="mt-8 flex items-center justify-center">
          <LoaderIcon />
        </div>
      )}
      {organisation && (
        <section className="space-y-2">
          <p>
            <strong>Nom:</strong>
            {organisation.name}
          </p>
          <p>
            <strong>Status:</strong>
            {organisation.status}
          </p>
          <p>
            <strong>Manager:</strong>
            {organisation.managerFirstname} {organisation.managerLastname}
          </p>
          <hr />
          <div className="flex items-center justify-between">
            <strong>Etablissements:</strong>
            <Link
              to={"/new-establishment/" + organisation.id}
              className="flex items-center gap-2 rounded bg-emerald-500 px-4 py-2 text-white hover:bg-green-700"
            >
              <PlusIcon /> Ajouter un établissement
            </Link>
          </div>
          <article className="grid grid-cols-4 gap-3">
            {organisation.establishments.map((establishment, i) => (
              <div key={i} className="rounded bg-background p-2">
                <p className="text-center font-bold">{establishment.name}</p>
                {establishment.employees.length > 0 && (
                  <div>
                    Employés:
                    {establishment.employees.map((employee, index) => (
                      <Link
                        to={"/schedule/" + employee.id}
                        key={index}
                        className="cursor-pointer rounded px-2 py-1 hover:bg-hover"
                      >
                        {employee.firstname} {employee.lastname}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </article>
        </section>
      )}
    </main>
  )
}

export default MyOrganisation
