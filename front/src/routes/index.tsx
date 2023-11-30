import { Fragment } from "react"
import { Toaster } from "react-hot-toast"
import type { RouteObject } from "react-router-dom"
import Layout from "@/components/Layout"
import App from "@/App"
import Login from "@/pages/auth/Login"
import Planning from "@/pages/planning"
import Team from "@/pages/team"

const getLayout = (element: JSX.Element): JSX.Element => (
  <Layout>
    <Fragment>
      {element}
      <Toaster position="bottom-right" />
    </Fragment>
  </Layout>
)

const defaultRoutes: RouteObject[] = [
  {
    path: "/",
    element: getLayout(<App />)
  },
  {
    path: "planning",
    element: getLayout(<Planning />)
  }
]
const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: getLayout(<Login />),
    children: [{ path: "/login/:db", element: getLayout(<Login />) }]
  }
]
const adminRoutes: RouteObject[] = [
  {
    path: "/admin/users",
    element: getLayout(<div>users</div>)
  }
]
const practitionerRoutes: RouteObject[] = []
const clientRoutes: RouteObject[] = []
const devRoutes: RouteObject[] = [
  {
    path: "teams/:teamId",
    element: getLayout(<Team />)
  }
]

export const routes: RouteObject[] = [
  ...defaultRoutes,
  ...adminRoutes,
  ...authRoutes,
  ...clientRoutes,
  ...practitionerRoutes,
  ...devRoutes
]
