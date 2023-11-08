import type { RouteObject } from "react-router-dom"
import Layout from "@/components/Layout"
import App from "@/App"
import Login from "@/pages/auth/Login"
import Planning from "@/pages/planning"
import Signin from "@/pages/signin"
import SigninEntreprisesPage from "@/pages/signinEntreprises"
import Team from "@/pages/team"

const getLayout = (element: JSX.Element): JSX.Element => (
  <Layout>{element}</Layout>
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
    path: "/signin",
    element: getLayout(<Signin />)
  },
  {
    path: "/login",
    element: getLayout(<Login />),
    children: [{ path: "/login/:db", element: getLayout(<Login />) }]
  }
]
const adminRoutes: RouteObject[] = []
const practitionerRoutes: RouteObject[] = []
const clientRoutes: RouteObject[] = []
const devRoutes: RouteObject[] = [
  {
    path: "/SigninEntreprisesPage",
    element: getLayout(<SigninEntreprisesPage />)
  },
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
