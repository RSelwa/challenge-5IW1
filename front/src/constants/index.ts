import type { HoraireType, SemaineType } from "@/types/api/slots"

export const dropdownMenuSideOffset = 0

// Exemple de données pour le type Slots
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
