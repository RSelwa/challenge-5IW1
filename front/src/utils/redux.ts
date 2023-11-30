import type { AnyAction, Dispatch } from "@reduxjs/toolkit"
import type { RoleUser, TokenApi } from "@/types/redux/token"
import { reduxStatus } from "@/types/redux/user"
import { resetUser, userLogged } from "@/redux/user/userSlice"

export const tokenToRedux = (
  tokenApi: string | undefined,
  dispatch: Dispatch<AnyAction>
) => {
  if (!tokenApi) {
    dispatch(resetUser())
    return
  }

  const token: TokenApi = parseJwt(tokenApi) as TokenApi
  console.log(token)

  const reduxUser: { email: string; status: reduxStatus } = {
    email: token.username,
    status: mapReduxStatus(token.roles[0])
  }

  dispatch(userLogged(reduxUser))
}
export const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join("")
  )

  return JSON.parse(jsonPayload)
}
export const mapReduxStatus = (status: RoleUser): reduxStatus => {
  switch (status) {
    case "ROLE_ADMIN":
      return "admin"

    default:
      return "admin"
  }
}
