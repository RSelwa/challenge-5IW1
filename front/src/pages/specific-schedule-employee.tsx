import React, { useEffect, useState } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import * as Popover from "@radix-ui/react-popover"
import { Translate } from "react-auto-translate"
import { LoaderIcon } from "react-hot-toast"
import { useParams } from "react-router-dom"
import type { EmployeeSpecificSchedulesWithId } from "@/types/withId"
import { fetchEmployeeSpecificSchedules } from "@/lib/employeeSpecificSchedules"
import ModalEditSpecificSchedule from "@/components/modal-edit-specific-schedule"
import ModalNewSpecificSchedule from "@/components/modal-new-specific-schedule"
import BackButton from "@/components/ui/BackButton"

const SpecificScheduleEmployee = () => {
  const { employeeId } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [specificScheduleDays, setSpecificScheduleDays] = useState<
    EmployeeSpecificSchedulesWithId[]
  >([])

  const fetchEmployeeSchedule = async () => {
    if (!employeeId) return
    setIsLoading(true)

    try {
      const allSpecificSchedules = await fetchEmployeeSpecificSchedules()

      const employeeSpecificSchedules = allSpecificSchedules.filter(
        (specificSchedule) => specificSchedule.employee.includes(employeeId)
      )

      setSpecificScheduleDays(employeeSpecificSchedules)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchEmployeeSchedule()
  }, [])
  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BackButton />
          <p>Emploi du temps spécifique</p>
        </div>
        {employeeId && (
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="mt-auto rounded bg-blue-500 px-2 py-1 text-center text-sm text-white transition-colors hover:bg-blue-700">
                <Translate>Spécifier des congés</Translate>
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="relative flex max-w-[550px] flex-col items-center gap-6 rounded bg-white p-4 shadow-xl">
                <Popover.Close
                  className=" absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </Popover.Close>
                <Popover.Arrow className="fill-white" />
                <ModalNewSpecificSchedule
                  employeeId={employeeId}
                  fetchEmployeeSchedule={fetchEmployeeSchedule}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </div>
      {isLoading && (
        <div className="flex items-center justify-center">
          <LoaderIcon />
        </div>
      )}
      {!isLoading && employeeId && (
        <div className="grid grid-cols-7 gap-3">
          {specificScheduleDays.map((day, i) => (
            <ModalEditSpecificSchedule
              specificSchedule={day}
              fetchMySchedule={fetchEmployeeSchedule}
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SpecificScheduleEmployee
