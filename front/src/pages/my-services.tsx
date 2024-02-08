import React, { useEffect, useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { Translate } from "react-auto-translate"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { ServicesWithId } from "@/types/withId"
import { fetchServices } from "@/lib/services"
import ModalEditService from "@/components/modal-edit-service"
import ModalNewService from "@/components/modal-new-service"

const MyServices = () => {
  const { employeeId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState<ServicesWithId[]>([])
  const fetchMyServices = async () => {
    try {
      setIsLoading(true)
      const services = await fetchServices()
      const myServices = services.filter(
        (service) => service.employee.id === employeeId
      )
      setServices(myServices)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMyServices()
  }, [])
  if (isLoading)
    return (
      <div className="mt-8 flex items-center justify-center">
        <LoaderIcon />
      </div>
    )
  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-bold">
          <Translate>Mes Services</Translate>
        </h1>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="mt-auto rounded bg-blue-500 px-2 py-1 text-center text-sm text-white transition-colors hover:bg-blue-700">
              <Translate>Ajouter un service</Translate>
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
              {employeeId && (
                <ModalNewService
                  fetchMyServices={fetchMyServices}
                  employeeId={employeeId}
                />
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {services.map((service, i) => (
          <ModalEditService
            fetchMyServices={fetchMyServices}
            key={i}
            service={service}
          />
        ))}
      </div>
    </div>
  )
}

export default MyServices
