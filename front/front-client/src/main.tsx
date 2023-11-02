import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@radix-ui/themes/styles.css"
import { Provider } from "react-redux"
import { Theme } from "@radix-ui/themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { store } from "@/redux/store.ts"
import App from "@/App"
import Signin from "@/pages/signin"
import SigninEntreprisesPage from "@/pages/signinEntreprises"
import Team from "@/pages/team"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/SigninEntreprisesPage",
    element: <SigninEntreprisesPage />
  },
  {
    path: "teams/:teamId",
    element: <Team />
  }
])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  </React.StrictMode>
)
