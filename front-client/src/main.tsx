import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { store } from "@/redux/store.ts"
import App from "@/App"
import Team from "@/pages/team"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "teams/:teamId",
    element: <Team />
  }
])
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
