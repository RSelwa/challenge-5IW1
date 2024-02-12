import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { SlotsWithId } from "@/types/withId"
import { fetchEmployee } from "@/lib/employees"
import { fetchOrganization } from "@/lib/organizations"
import { parseJwt } from "@/utils/redux"
import ReservationHistoryRow from "@/components/Rows/reservation-history-row"

const ReservationHistory = () => {
  const { id } = useParams()
  const { roles } = parseJwt(localStorage.getItem("token") || "")
  if (!id) return null
  const [slots, setSlots] = useState<SlotsWithId[]>([])
  const fetchOrganisation = async () => {
    try {
      const { establishments } = await fetchOrganization(id)
      const allSlots = establishments
        .map((establishment) =>
          establishment.employees
            .map((employee) =>
              employee.services.map((service) => service.slots).flat()
            )
            .flat()
        )
        .flat()
      setSlots(allSlots)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchEmployeeData = async () => {
    try {
      const { services } = await fetchEmployee(id)
      const allSlots = services.map((service) => service.slots).flat()
      setSlots(allSlots)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (roles.includes("ROLE_ORGANIZATION")) fetchOrganisation()
    if (roles.includes("ROLE_EMPLOYEE")) fetchEmployeeData()
  }, [])

  return (
    <div className="mx-auto w-1/2 space-y-4 p-8">
      <h1>Réservations</h1>
      <div className="">
        {slots.map((slot, i) => (
          <ReservationHistoryRow
            slot={slot}
            key={i}
            i={i}
            slotsLength={slots.length}
          />
        ))}
      </div>
    </div>
  )
}

export default ReservationHistory
