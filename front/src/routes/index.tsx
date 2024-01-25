import { Fragment } from "react"
import { Toaster } from "react-hot-toast"
import type { RouteObject } from "react-router-dom"
import {
  EMPLOYEE_KEY_EXCEPTION,
  EMPLOYEE_KEY_LINK_EDIT,
  EMPLOYEE_SPECIFIC_SCHEDULE_KEY_EXCEPTION,
  ESTABLISHMENT_KEY_EXCEPTION,
  ESTABLISHMENT_KEY_LINK_EDIT,
  NOTATION_KEY_EXCEPTION,
  ORGANIZATION_KEY_EXCEPTION,
  ORGANIZATION_KEY_LINK_EDIT,
  SERVICE_KEY_EXCEPTION,
  SLOT_KEY_EXCEPTION,
  USER_KEY_EXCEPTION
} from "@/constants/admin"
import {
  employeesHeader,
  employeesSpecificSchedulesHeader,
  establishmentsHeader,
  notationsHeader,
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
import { fetchNotation, fetchNotations, patchNotation } from "@/lib/notations"
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
import NotationsRows from "@/components/Rows/admin/NotationsRows"
import OrganizationsRows from "@/components/Rows/admin/OrganizationsRows"
import ServicesRows from "@/components/Rows/admin/ServicesRows"
import SlotsRows from "@/components/Rows/admin/SlotsRows"
import UsersRowsAdmin from "@/components/Rows/admin/UsersRows"
import Error from "@/components/ui/Error"
import App from "@/App"
import AdminHome from "@/pages/AdminHome"
import Login from "@/pages/auth/Login"
import SigninOrganization from "@/pages/auth/SigninOrganisation"
import MyAccount from "@/pages/MyAccount"
import Planning from "@/pages/planning"

const getLayout = (
  element: JSX.Element,
  adminSecurity = false
): JSX.Element => (
  <Layout adminSecurity={adminSecurity}>
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
    element: getLayout(<Planning employeeId={""} duration={1} />)
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
    element: getLayout(<AdminHome />, true)
  },
  {
    path: "/admin/users",
    element: getLayout(
      <AdminView
        Rows={UsersRowsAdmin}
        promiseFetch={fetchUsers}
        header={usersHeader}
      />,
      true
    )
  },

  {
    path: "/admin/slots",
    element: getLayout(
      <AdminView
        Rows={SlotsRows}
        promiseFetch={fetchSlots}
        header={slotsHeader}
      />,
      true
    )
  },

  {
    path: "/admin/services",
    element: getLayout(
      <AdminView
        Rows={ServicesRows}
        promiseFetch={fetchServices}
        header={servicesHeader}
      />,
      true
    )
  },

  {
    path: "/admin/organizations",
    element: getLayout(
      <AdminView
        Rows={OrganizationsRows}
        promiseFetch={fetchOrganizations}
        header={organizationsHeader}
      />,
      true
    )
  },

  {
    path: "/admin/establishments",
    element: getLayout(
      <AdminView
        Rows={EstablishmentsRows}
        promiseFetch={fetchEstablishments}
        header={establishmentsHeader}
      />,
      true
    )
  },

  {
    path: "/admin/employees",
    element: getLayout(
      <AdminView
        Rows={EmployeesRows}
        promiseFetch={fetchEmployees}
        header={employeesHeader}
      />,
      true
    )
  },

  {
    path: "/admin/employeeSpecificSchedules",
    element: getLayout(
      <AdminView
        Rows={EmployeeSpecificScheduleRows}
        promiseFetch={fetchEmployeeSpecificSchedules}
        header={employeesSpecificSchedulesHeader}
      />,
      true
    )
  },
  {
    path: "/admin/notations",
    element: getLayout(
      <AdminView
        Rows={NotationsRows}
        promiseFetch={fetchNotations}
        header={notationsHeader}
      />,
      true
    )
  },
  {
    path: "/admin/users/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchUser}
        dataKeyException={USER_KEY_EXCEPTION}
        editFunctions={editUser}
      />,
      true
    )
  },
  {
    path: "/admin/slots/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchSlot}
        dataKeyException={SLOT_KEY_EXCEPTION}
        editFunctions={editSlot}
      />,
      true
    )
  },
  {
    path: "/admin/services/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchService}
        dataKeyException={SERVICE_KEY_EXCEPTION}
        editFunctions={editService}
      />,
      true
    )
  },
  {
    path: "/admin/organizations/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchOrganization}
        dataKeyException={ORGANIZATION_KEY_EXCEPTION}
        editFunctions={editOrganization}
        dataKeyLink={ORGANIZATION_KEY_LINK_EDIT}
      />,
      true
    )
  },
  {
    path: "/admin/establishments/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchEstablishment}
        dataKeyException={ESTABLISHMENT_KEY_EXCEPTION}
        editFunctions={editEstablishment}
        dataKeyLink={ESTABLISHMENT_KEY_LINK_EDIT}
      />,
      true
    )
  },
  {
    path: "/admin/employees/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchEmployee}
        dataKeyException={EMPLOYEE_KEY_EXCEPTION}
        editFunctions={editEmployee}
        dataKeyLink={EMPLOYEE_KEY_LINK_EDIT}
      />,
      true
    )
  },
  {
    path: "/admin/employeeSpecificSchedules/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchEmployeeSpecificSchedule}
        dataKeyException={EMPLOYEE_SPECIFIC_SCHEDULE_KEY_EXCEPTION}
        editFunctions={editEmployeeSpecificSchedule}
      />,
      true
    )
  },
  {
    path: "/admin/notations/:id",
    element: getLayout(
      <ItemId
        fetchItem={fetchNotation}
        dataKeyException={NOTATION_KEY_EXCEPTION}
        editFunctions={patchNotation}
      />,
      true
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
