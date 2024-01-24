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
    idTarget: "user123",
    idFrom: "user456",
    note: 4,
    comments: "Très bon travail!",
    id: "notation1"
  },
  {
    idTarget: "user789",
    idFrom: "user101",
    note: 3,
    comments: "Peut s'améliorer",
    id: "notation2"
  },
  {
    idTarget: "user111",
    idFrom: "user222",
    note: 5,
    comments: "Excellent!",
    id: "notation3"
  },
  {
    idTarget: "user333",
    idFrom: "user444",
    note: 2,
    comments: "Besoin d'efforts supplémentaires",
    id: "notation4"
  },
  {
    idTarget: "user555",
    idFrom: "user666",
    note: 4,
    comments: "Bonne prestation dans l'ensemble",
    id: "notation5"
  }
]
