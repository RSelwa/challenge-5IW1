import React from "react"
import ReactDOM from "react-dom/client"
import "@radix-ui/themes/styles.css"
import "./index.css"
import { Provider, useDispatch } from "react-redux"
import { Theme } from "@radix-ui/themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { tokenToRedux } from "@/utils/redux"
import { store } from "@/redux/store"
import { routes } from "@/routes"

const Redux = () => {
  const dispatch = useDispatch()
  const events = ["local-storage-updated", "storage"]
  events.forEach((event) => {
    window.addEventListener(event, () =>
      tokenToRedux(localStorage.getItem("token") || "", dispatch)
    )
  })
  tokenToRedux(localStorage.getItem("token") || "", dispatch)

  return null
}
const router = createBrowserRouter([...routes])
ReactDOM.createRoot(
  document.getElementById("root") || document.createDocumentFragment()
).render(
  <Provider store={store}>
    <Theme>
      <>
        <RouterProvider router={router} />
        <Redux />
      </>
    </Theme>
  </Provider>
)
