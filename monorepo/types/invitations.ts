export type Invitation = {
  email: string
  organizationId: string
  invitationStatus: invitationStatus
}

type invitationStatus = "pending" | "accepted" | "refused" | "expired"
