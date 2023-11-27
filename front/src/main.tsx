import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@radix-ui/themes/styles.css"
import { Provider } from "react-redux"
import { Theme } from "@radix-ui/themes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { store } from "@/redux/store"
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
