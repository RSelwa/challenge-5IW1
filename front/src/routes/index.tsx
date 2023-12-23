import { Fragment } from "react"
import { Toaster } from "react-hot-toast"
import type { RouteObject } from "react-router-dom"
import { DEFAULT_KEY_EXCEPTION, USER_KEY_EXCEPTION } from "@/constants/admin"
import {
  employeesHeader,
  employeesSpecificSchedulesHeader,
  establishmentsHeader,
  organizationsHeader,
  servicesHeader,
  slotsHeader,
  usersHeader
} from "@/constants/tableHeaders"
import { editEmployee, fetchEmployee, fetchEmployees } from "@/lib/employees"
import {
  editEmployeeSpecificSchedule,
  fetchEmployeeSpecificSchedule,
  fetchEmployeeSpecificSchedules
} from "@/lib/employeeSpecificSchedules"
import {
  editEstablishment,
  fetchEstablishment,
  fetchEstablishments
} from "@/lib/establishments"
import {
  editOrganization,
  fetchOrganization,
  fetchOrganizations
} from "@/lib/organizations"
import { editService, fetchService, fetchServices } from "@/lib/services"
import { editSlot, fetchSlot, fetchSlots } from "@/lib/slots"
import { editUser, fetchUser, fetchUsers } from "@/lib/users"
import ItemId from "@/components/admin/ItemId"
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
import AdminHome from "@/pages/AdminHome"
import Login from "@/pages/auth/Login"
import SigninOrganization from "@/pages/auth/SigninOrganisation"
import Planning from "@/pages/planning"
import MyAccount from "@/pages/MyAccount"



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
    path: "/planning",
    element: getLayout(<Planning />)
  },
  {
    path: "/profil",
    element: getLayout(<MyAccount />)
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
    element: getLayout(
      <AdminView
        Rows={UsersRowsAdmin}
        promiseFetch={fetchUsers}
        header={usersHeader}
      />
    )
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
    path: "/admin/users/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchUser}
        dataKeyException={USER_KEY_EXCEPTION}
        editFunctions={editUser}
      />
    )
  },
  {
    path: "/admin/slots/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchSlot}
        dataKeyException={DEFAULT_KEY_EXCEPTION}
        editFunctions={editSlot}
      />
    )
  },
  {
    path: "/admin/services/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchService}
        dataKeyException={DEFAULT_KEY_EXCEPTION}
        editFunctions={editService}
      />
    )
  },
  {
    path: "/admin/organizations/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchOrganization}
        dataKeyException={DEFAULT_KEY_EXCEPTION}
        editFunctions={editOrganization}
      />
    )
  },
  {
    path: "/admin/establishments/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchEstablishment}
        dataKeyException={DEFAULT_KEY_EXCEPTION}
        editFunctions={editEstablishment}
      />
    )
  },
  {
    path: "/admin/employees/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchEmployee}
        dataKeyException={DEFAULT_KEY_EXCEPTION}
        editFunctions={editEmployee}
      />
    )
  },
  {
    path: "/admin/employeeSpecificSchedules/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchEmployeeSpecificSchedule}
        dataKeyException={DEFAULT_KEY_EXCEPTION}
        editFunctions={editEmployeeSpecificSchedule}
      />
    )
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
