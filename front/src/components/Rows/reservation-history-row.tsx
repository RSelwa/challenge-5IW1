import React from "react"
import type { SlotsWithId } from "@/types/withId"
import { dateToString, getHoursMinutes } from "@/utils/date"

type Props = {
  slot: SlotsWithId
  i: number
  slotsLength: number
}

const ReservationHistoryRow = ({ slot, i, slotsLength }: Props) => {
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
      <div
        data-status={slot.status}
        className="flex items-center justify-center rounded px-4 py-2 data-[status=canceled]:bg-red-100 data-[status=passed]:bg-emerald-100 data-[status=reserved]:bg-cyan-100"
      >
        {slot.status}
      </div>
    </div>
  )
}

export default ReservationHistoryRow
