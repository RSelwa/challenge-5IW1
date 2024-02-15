import React, { Dispatch, SetStateAction } from "react"
import { Translate } from "react-auto-translate"
import type { SlotsWithId } from "@/types/withId"
import { changeReservationStatus } from "@/lib/slots"
import { dateToString, getHoursMinutes } from "@/utils/date"
import { parseJwt } from "@/utils/redux"

type Props = {
  slot: SlotsWithId
  i: number
  slotsLength: number
  fetchEmployeeData: () => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const ReservationHistoryRow = ({
  slot,
  i,
  slotsLength,
  fetchEmployeeData,
  setIsLoading
}: Props) => {
  const { roles } =
    parseJwt(localStorage.getItem("token")?.replaceAll('"', "") || "") || []
  return (
    <div
      data-state={i === 0 ? "first" : i === slotsLength - 1 ? "last" : "middle"}
      className="group flex items-center justify-between border p-4 text-gray-800 transition-all  data-[state=first]:rounded-t-lg data-[state=last]:rounded-b-lg data-[state=first]:border-b-0 data-[state=middle]:border-b-0 data-[state=first]:border-gray-200 data-[state=last]:border-gray-200 data-[state=middle]:border-gray-200 "
    >
      <p>
        {dateToString(new Date(parseInt(slot.startTime) * 1000))} à{" "}
        {getHoursMinutes(new Date(parseInt(slot.startTime) * 1000))} -{" "}
        {slot.duration}H
      </p>
      <div className="flex items-center gap-2">
        {slot.status === "reserved" && roles.includes("ROLE_EMPLOYEE") && (
          <button
            className="invisible rounded bg-green-400 px-4 py-2 text-xs text-white hover:bg-green-700 group-hover:visible"
            onClick={() =>
              changeReservationStatus(
                slot.id,
                "passed",
                fetchEmployeeData,
                setIsLoading
              )
            }
          >
            <Translate> Marquer comme passé</Translate>
          </button>
        )}
        <div
          data-status={slot.status}
          className="flex items-center justify-center rounded px-4 py-2 data-[status=canceled]:bg-red-100 data-[status=passed]:bg-emerald-100 data-[status=reserved]:bg-amber-100"
        >
          {slot.status}
        </div>
      </div>
    </div>
  )
}

export default ReservationHistoryRow
