import { Fragment } from "react"
import { Toaster } from "react-hot-toast"
import type { RouteObject } from "react-router-dom"
import Layout from "@/components/Layout"
import App from "@/App"
import EmployeesAdmin from "@/pages/admin/employees"
import EmployeesIdAdmin from "@/pages/admin/employees/id"
import EmployeeSpecificSchedulesAdmin from "@/pages/admin/employeeSpecificSchedules"
import EmployeeSpecificSchedulesIdAdmin from "@/pages/admin/employeeSpecificSchedules/id"
import EstablishmentsAdmin from "@/pages/admin/establishments"
import EstablishmentsIdAdmin from "@/pages/admin/establishments/id"
import OrganizationsAdmin from "@/pages/admin/organizations"
import OrganizationsIdAdmin from "@/pages/admin/organizations/id"
import SlotsAdmin from "@/pages/admin/slots"
import SlotsIdAdmin from "@/pages/admin/slots/id"
import UsersAdmin from "@/pages/admin/users"
import UserIdAdmin from "@/pages/admin/users/id"
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
export const adminRoutes: RouteObject[] = [
  {
    path: "/admin/users",
    element: getLayout(<UsersAdmin />),
    children: [{ path: "/admin/users:id", element: getLayout(<UserIdAdmin />) }]
  },
  {
    path: "/admin/slots",
    element: getLayout(<SlotsAdmin />),
    children: [
      { path: "/admin/slots:id", element: getLayout(<SlotsIdAdmin />) }
    ]
  },
  {
    path: "/admin/organizations",
    element: getLayout(<OrganizationsAdmin />),
    children: [
      {
        path: "/admin/organizations:id",
        element: getLayout(<OrganizationsIdAdmin />)
      }
    ]
  },
  {
    path: "/admin/establishments",
    element: getLayout(<EstablishmentsAdmin />),
    children: [
      {
        path: "/admin/establishments:id",
        element: getLayout(<EstablishmentsIdAdmin />)
      }
    ]
  },
  {
    path: "/admin/employees",
    element: getLayout(<EmployeesAdmin />),
    children: [
      {
        path: "/admin/employees:id",
        element: getLayout(<EmployeesIdAdmin />)
      }
    ]
  },
  {
    path: "/admin/employeeSpecificSchedules",
    element: getLayout(<EmployeeSpecificSchedulesAdmin />),
    children: [
      {
        path: "/admin/employeeSpecificSchedules:id",
        element: getLayout(<EmployeeSpecificSchedulesIdAdmin />)
      }
    ]
  },
  {
    path: "/admin/slots",
    element: getLayout(<SlotsAdmin />),
    children: [
      { path: "/admin/slots:id", element: getLayout(<SlotsIdAdmin />) }
    ]
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
