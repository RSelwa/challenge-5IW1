import type { ReservationWithId } from "@/monorepo/types/withId"

export const reservationMock: ReservationWithId = {
  clientId: "clientId",
  date: new Date(),
  id: "reservationId",
  prestationId: "prestationId"
}
