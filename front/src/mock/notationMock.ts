import type {
  NotationtionsWithId,
  SlotsWithId,
  UsersWithId
} from "@/types/withId"

export const users: UsersWithId[] = [
  {
    id: "102efgs525",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    slots: [
      {
        id: "1",
        employee: "Dr. Smith",
        date: "2024-01-22",
        startTime: "08:00",
        endTime: "09:00",
        status: "Booked"
      }
    ]
  },
  {
    id: "2",
    firstname: "Jane",
    lastname: "Smith",
    email: "jane.smith@example.com",
    slots: [
      {
        id: "2",
        employee: "Dr. Johnson",
        date: "2024-01-22",
        startTime: "10:00",
        endTime: "11:00",
        status: "Available"
      }
    ]
  }
]

export const slots: SlotsWithId[] = [
  {
    id: "1",
    employee: "Dr. Smith",
    date: "2024-01-22",
    startTime: "08:00",
    endTime: "09:00",
    status: "Booked"
  },
  {
    id: "2",
    employee: "Dr. Johnson",
    date: "2024-01-22",
    startTime: "10:00",
    endTime: "11:00",
    status: "Available"
  }
]

export const mockNotation: NotationtionsWithId[] = [
  {
    idNotationTarget: "user123",
    idNotationFrom: "user456",
    note: 4,
    comments: "Très bon travail!",
    id: "notation1"
  },
  {
    idNotationTarget: "user789",
    idNotationFrom: "user101",
    note: 3,
    comments: "Peut s'améliorer",
    id: "notation2"
  },
  {
    idNotationTarget: "user111",
    idNotationFrom: "user222",
    note: 5,
    comments: "Excellent!",
    id: "notation3"
  },
  {
    idNotationTarget: "user333",
    idNotationFrom: "user444",
    note: 2,
    comments: "Besoin d'efforts supplémentaires",
    id: "notation4"
  },
  {
    idNotationTarget: "user555",
    idNotationFrom: "user666",
    note: 4,
    comments: "Bonne prestation dans l'ensemble",
    id: "notation5"
  }
]
