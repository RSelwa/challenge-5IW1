import { UsersWithId } from "@/types/withId";
import type { SlotsWithId } from "@/types/withId"



export const users: UsersWithId[] = [
    {
      id: "1",
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
          status: "Booked",
        },
      ],
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
          status: "Available",
        },
      ],
    },
  ];

  
  export const slots: SlotsWithId[] = [
    {
      id: "1",
      employee: "Dr. Smith",
      date: "2024-01-22",
      startTime: "08:00",
      endTime: "09:00",
      status: "Booked",
    },
    {
      id: "2",
      employee: "Dr. Johnson",
      date: "2024-01-22",
      startTime: "10:00",
      endTime: "11:00",
      status: "Available",
    },
    
  ];