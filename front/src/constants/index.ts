import type { HoraireType, SemaineType } from "@/types/api/slots"

export const dropdownMenuSideOffset = 0

// Exemple de données pour le type Slots
export const defaultHoraireType: HoraireType = {
  startTimeMatinee: 8, // 8:00 AM en millisecondes
  endTimeMatinee: 12, // 12:00 PM en millisecondes
  startTimeAprem: 14, // 2:00 PM en millisecondes
  endTimeAprem: 18 // 6:00 PM en millisecondes
}
// Exemple de données pour le type SemaineType
export const semaineTypeData: SemaineType[] = [
  {
    employeeId: "EMP001",
    dayOfWeek: 1, // Lundi
    startTimeMatinee: 9, // 8:00 AM en millisecondes
    endTimeMatinee: 12, // 12:00 PM en millisecondes
    startTimeAprem: 14, // 2:00 PM en millisecondes
    endTimeAprem: 18 // 6:00 PM en millisecondes
  },
  {
    employeeId: "EMP002",
    dayOfWeek: 3, // Mercredi
    startTimeMatinee: 12, // 9:00 AM en millisecondes
    endTimeMatinee: 12, // 1:00 PM en millisecondes
    startTimeAprem: 14, // 2:00 PM en millisecondes
    endTimeAprem: 18 // 6:00 PM en millisecondes
  }
  // Ajoutez autant d'entrées que nécessaire
]

export const AVATAR_COLORS = {
  ROLE_USER: {
    color: ["#92A1C6", "#146A7C", "#fff", "#C271B4", "#74FFC9"],
    name: "Maya Angelou"
  },
  ROLE_ADMIN: {
    color: ["#0FC3E8", "#0194BE", "#E2D397", "#F07E13", "#481800"],
    name: "Biddy Mason"
  },
  ROLE_EMPLOYEE: {
    color: ["#5e5473", "#19b5a5", "#ede89d", "#ff6933", "#ff0048"],
    name: "Biddy Mason"
  },
  ROLE_ORGANIZATION: {
    color: ["#fdffd9", "#fff0b8", "#ffd6a3", "#faad8e", "#142f30"],
    name: "Mother Frances"
  }
}
