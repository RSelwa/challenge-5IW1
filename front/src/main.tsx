import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@radix-ui/themes/styles.css"
import { Provider } from "react-redux"
import { Theme } from "@radix-ui/themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { store } from "@/redux/store"
import App from "@/App"
import Layout from "@/Layout"
import Planning from "@/pages/planning"
import Signin from "@/pages/signin"
import SigninEntreprisesPage from "@/pages/signinEntreprises"
import Team from "@/pages/team"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    )
  },
  {
    path: "/signin",
    element: (
      <Layout>
        <Signin />
      </Layout>
    )
  },
  {
    path: "/SigninEntreprisesPage",
    element: (
      <Layout>
        <SigninEntreprisesPage />
      </Layout>
    )
  },
  {
    path: "teams/:teamId",
    element: (
      <Layout>
        <Team />
      </Layout>
    )
  },
  {
    path: "planning",
    element: (
      <Layout>
        <Planning />
      </Layout>
    )
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
