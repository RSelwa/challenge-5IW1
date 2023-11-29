import type { AnyAction, Dispatch } from "@reduxjs/toolkit"
import type { TokenApi } from "@/types/redux/token"
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
  dispatch(userLogged({ email: token.username, status: "user" }))
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
