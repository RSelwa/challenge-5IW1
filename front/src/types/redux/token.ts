export type TokenApi = UserToken

export type UserToken = {
  iat: number
  exp: number
  roles: RoleUser[]
  id: string //! FIX: It's email
}
export type RoleUser = "ROLE_USER" | "ROLE_ADMIN"
