import React, { useEffect, useState } from "react"
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { LoaderIcon } from "react-hot-toast"
import { Link } from "react-router-dom"
import type { OrganizationsWithId } from "@/types/withId"
import { fetchOrganization } from "@/lib/organizations"
import { parseJwt } from "@/utils/redux"
import ModalNewEmployee from "@/components/modal-new-employee"
import { Translate } from "react-auto-translate"


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
      <h1 className="mb-4 text-xl font-bold"><Translate>Mon organisation</Translate></h1>
      {isLoading && !organisation && (
        <div className="mt-8 flex items-center justify-center">
          <LoaderIcon />
        </div>
      )}
      {organisation && (
        <section className="space-y-2">
          <p>
            <strong><Translate>Nom:</Translate></strong>
            {organisation.name}
          </p>
          <p>
            <strong><Translate>Status:</Translate></strong>
            {organisation.status}
          </p>
          <p>
            <strong><Translate>Manager:</Translate></strong>
            {organisation.managerFirstname} {organisation.managerLastname}
          </p>
          <hr />
          <div className="flex items-center justify-between">
            <strong><Translate>Etablissements:</Translate></strong>
            <Link
              to={"/new-establishment/" + organisation.id}
              className="flex items-center gap-2 rounded bg-emerald-500 px-4 py-2 text-white hover:bg-green-700"
            >
              <PlusIcon /> <Translate>Ajouter un établissement</Translate>
            </Link>
          </div>
          <article className="grid grid-cols-4 gap-3">
            {organisation.establishments.map((establishment, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded bg-background p-2"
              >
                <p className="text-center font-bold">{establishment.name}</p>
                {establishment.employees.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="px-2 py-1"><Translate>Employés:</Translate></p>
                    {establishment.employees.map((employee, index) => (
                      <Link
                        to={"/schedule/" + employee.id}
                        key={index}
                        className="cursor-pointer rounded  hover:bg-hover"
                      >
                        {employee.firstname} {employee.lastname}
                      </Link>
                    ))}
                  </div>
                )}
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button className="mt-auto rounded bg-blue-300 px-2 py-1 text-center text-sm text-white transition-colors hover:bg-blue-500">
                      <Translate>Ajouter un employé</Translate>
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content className="relative flex max-w-[350px] flex-col items-center gap-6 rounded bg-white p-4 shadow-xl">
                      <Popover.Close
                        className=" absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </Popover.Close>
                      <Popover.Arrow className="fill-white" />
                      <ModalNewEmployee establishmentId={establishment.id} />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </div>
            ))}
          </article>
        </section>
      )}
    </main>
  )
}

export default MyOrganisation
