import { RouteObject } from "react-router-dom"
import Layout from "@/components/Layout"
import App from "@/App"
import Login from "@/pages/auth/Login"
import Planning from "@/pages/planning"
import Signin from "@/pages/signin"
import SigninEntreprisesPage from "@/pages/signinEntreprises"
import Team from "@/pages/team"

const defaultRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <App />
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
]
const authRoutes: RouteObject[] = [
  {
    path: "/signin",
    element: (
      <Layout>
        <Signin />
      </Layout>
    )
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    )
  }
]
const adminRoutes: RouteObject[] = []
const practitionerRoutes: RouteObject[] = []
const clientRoutes: RouteObject[] = []
const devRoutes: RouteObject[] = [
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
