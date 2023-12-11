<<<<<<< Updated upstream
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
=======
import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@radix-ui/themes/styles.css"
import { Provider } from "react-redux"
import { Theme } from "@radix-ui/themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { store } from "@/redux/store"
import Layout from "@/components/Layout"
import App from "@/App"
import Planning from "@/pages/planning"
import Signin from "@/pages/signin"
import SigninEntreprisesPage from "@/pages/signinEntreprises"
import Team from "@/pages/team"
import { routes } from "@/routes"

const router = createBrowserRouter([...routes])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  </React.StrictMode>
)
>>>>>>> Stashed changes
