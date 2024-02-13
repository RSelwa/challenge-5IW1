export type EmployeeSpecificSchedulePost = {
  id: string
  employee: string
  date: string
  type: string
  status: string
}

export type EmployeeWeekSchedulePost = {
  employee: string
  startTimeMorning: number
  endTimeMorning: number
  startTimeAfternoon: number
  endTimeAfternoon: number
  day: number
}

export type EmployeePost = {
  category: string
  firstname: string
  lastname: string
  establishment: string
  email: string
  plainPassword: string
}

export type EstablishmentPost = {
  name: string
  address: string
  zipCode: string
  city: string
  country: string
  organization: string
  lat: number
  lng: number
}

export type NotificationPost = {
  note: number
  comment: string
  idNotationTarget: string
  idNotationFrom: string
}

export type OrganizationPost = {
  name: string
  managerFirstname: string
  managerLastname: string
  kbisFile: string
  siret: string
  email: string
  plainPassword: string
}

export type ServicePost = {
  name: string
  duration: number
  employee: string
  price: number
}

export type SlotPost = {
  user: string
  startTime: number
  duration: number
  status: string
  service: string
}

export type UserPost = {
  firstname: string
  lastname: string
  email: string
  plainPassword: string
}
