export type TokenApi = UserToken

export type UserToken = {
  iat: number
  exp: number
  roles: RoleUser[]
  username: string //! FIX: It's email
}
export type RoleUser = "ROLE_USER" | "ROLE_ADMIN"
