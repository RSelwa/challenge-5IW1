import { Fragment } from "react"
import { Toaster } from "react-hot-toast"
import type { RouteObject } from "react-router-dom"
import {
  employeesHeader,
  employeesSpecificSchedulesHeader,
  establishmentsHeader,
  organizationsHeader,
  servicesHeader,
  slotsHeader,
  usersHeader
} from "@/constants/tableHeaders"
import { fetchEmployees } from "@/lib/employees"
import { fetchEmployeeSpecificSchedules } from "@/lib/employeeSpecificSchedules"
import { fetchEstablishments } from "@/lib/establishments"
import { fetchOrganizations } from "@/lib/organizations"
import { fetchServices } from "@/lib/services"
import { fetchSlots } from "@/lib/slots"
import { fetchUsers } from "@/lib/users"
import AdminView from "@/components/AdminView"
import Layout from "@/components/Layout"
import EmployeeSpecificScheduleRows from "@/components/Rows/admin/EmployeeSpecificScheduleRows"
import EmployeesRows from "@/components/Rows/admin/EmployeesRows"
import EstablishmentsRows from "@/components/Rows/admin/EstablishmentsRows"
import OrganizationsRows from "@/components/Rows/admin/OrganizationsRows"
import ServicesRows from "@/components/Rows/admin/ServicesRows"
import SlotsRows from "@/components/Rows/admin/SlotsRows"
import UsersRowsAdmin from "@/components/Rows/admin/UsersRows"
import Error from "@/components/ui/Error"
import App from "@/App"
import EmployeesIdAdmin from "@/pages/admin/employees/id"
import EmployeeSpecificSchedulesIdAdmin from "@/pages/admin/employeeSpecificSchedules/id"
import EstablishmentsIdAdmin from "@/pages/admin/establishments/id"
import OrganizationsIdAdmin from "@/pages/admin/organizations/id"
import ServicesIdAdmin from "@/pages/admin/services/id"
import SlotsIdAdmin from "@/pages/admin/slots/id"
import UserIdAdmin from "@/pages/admin/users/id"
import AdminHome from "@/pages/AdminHome"
import Login from "@/pages/auth/Login"
import SigninOrganization from "@/pages/auth/SigninOrganisation"
import Planning from "@/pages/planning"

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
    element: getLayout(<Login />)
  },
  {
    path: "/signin/organization",
    element: getLayout(<SigninOrganization />)
  }
]
export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: getLayout(<AdminHome />)
  },
  {
    path: "/admin/users",
    // element: getLayout(<UsersAdmin />)
    element: getLayout(
      <AdminView
        Rows={UsersRowsAdmin}
        promiseFetch={fetchUsers}
        header={usersHeader}
      />
    )
  },
  {
    path: "/admin/users/:id",
    element: getLayout(<UserIdAdmin />)
  },
  {
    path: "/admin/slots",
    element: getLayout(
      <AdminView
        Rows={SlotsRows}
        promiseFetch={fetchSlots}
        header={slotsHeader}
      />
    )
  },
  {
    path: "/admin/slots/:id",
    element: getLayout(<SlotsIdAdmin />)
  },
  {
    path: "/admin/services",
    element: getLayout(
      <AdminView
        Rows={ServicesRows}
        promiseFetch={fetchServices}
        header={servicesHeader}
      />
    )
  },
  {
    path: "/admin/services/:id",
    element: getLayout(<ServicesIdAdmin />)
  },
  {
    path: "/admin/organizations",
    element: getLayout(
      <AdminView
        Rows={OrganizationsRows}
        promiseFetch={fetchOrganizations}
        header={organizationsHeader}
      />
    )
  },
  {
    path: "/admin/organizations/:id",
    element: getLayout(<OrganizationsIdAdmin />)
  },
  {
    path: "/admin/establishments",
    element: getLayout(
      <AdminView
        Rows={EstablishmentsRows}
        promiseFetch={fetchEstablishments}
        header={establishmentsHeader}
      />
    )
  },
  {
    path: "/admin/establishments/:id",
    element: getLayout(<EstablishmentsIdAdmin />)
  },
  {
    path: "/admin/employees",
    element: getLayout(
      <AdminView
        Rows={EmployeesRows}
        promiseFetch={fetchEmployees}
        header={employeesHeader}
      />
    )
  },
  {
    path: "/admin/employees/:id",
    element: getLayout(<EmployeesIdAdmin />)
  },
  {
    path: "/admin/employeeSpecificSchedules",
    element: getLayout(
      <AdminView
        Rows={EmployeeSpecificScheduleRows}
        promiseFetch={fetchEmployeeSpecificSchedules}
        header={employeesSpecificSchedulesHeader}
      />
    )
  },
  {
    path: "/admin/employeeSpecificSchedules/:id",
    element: getLayout(<EmployeeSpecificSchedulesIdAdmin />)
  }
]

export const routes: RouteObject[] = [
  ...defaultRoutes,
  ...adminRoutes,
  ...authRoutes,
  {
    path: "/*",
    element: getLayout(<div>404</div>)
  }
].map((route) => ({ ...route, errorElement: getLayout(<Error />) }))
