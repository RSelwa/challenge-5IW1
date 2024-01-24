import type { HoraireType, SemaineType, Slots } from "@/types/api/slots"

export const dropdownMenuSideOffset = 16

// Exemple de données pour le type Slots
export const slotsData: Slots[] = [
  {
    employeeId: "EMP001",
    startTime: 1705500240000, // 	Wed Jan 17 2024 14:04:00
    duration: 1, // 1 heure en millisecondes
    status: "booked"
  },
  {
    employeeId: "EMP001",
    startTime: 1705493040000, // Wed Jan 17 2024 12:04:00
    duration: 1, // 1 heure en millisecondes
    status: "booked"
  },
  {
    employeeId: "EMP001",
    startTime: 1705571521000, // Thu Jan 18 2024 10:52:01
    duration: 2, // 2 heures en millisecondes
    status: "available"
  }
  // Ajoutez autant d'entrées que nécessaire
]
export const defaultHoraireType: HoraireType = {
  startTimeMatinée: 8, // 8:00 AM en millisecondes
  endTimeMatinée: 12, // 12:00 PM en millisecondes
  startTimeAprem: 14, // 2:00 PM en millisecondes
  endTimeAprem: 18 // 6:00 PM en millisecondes
}

// Exemple de données pour le type SemaineType
export const semaineTypeData: SemaineType[] = [
  {
    employeeId: "EMP001",
    dayOfWeek: 1, // Lundi
    startTimeMatinée: 9, // 8:00 AM en millisecondes
    endTimeMatinée: 12, // 12:00 PM en millisecondes
    startTimeAprem: 14, // 2:00 PM en millisecondes
    endTimeAprem: 18 // 6:00 PM en millisecondes
  },
  {
    employeeId: "EMP002",
    dayOfWeek: 3, // Mercredi
    startTimeMatinée: 12, // 9:00 AM en millisecondes
    endTimeMatinée: 12, // 1:00 PM en millisecondes
    startTimeAprem: 14, // 2:00 PM en millisecondes
    endTimeAprem: 18 // 6:00 PM en millisecondes
  }
  // Ajoutez autant d'entrées que nécessaire
]
