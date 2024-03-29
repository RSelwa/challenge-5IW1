import { Fragment } from "react"
import { Toaster } from "react-hot-toast"
import type { RouteObject } from "react-router-dom"
import {
  EMPLOYEE_KEY_EXCEPTION,
  EMPLOYEE_KEY_LINK_EDIT,
  EMPLOYEE_SPECIFIC_SCHEDULE_KEY_EXCEPTION,
  EMPLOYEE_WEEK_SCHEDULE_KEY_EXCEPTION,
  ESTABLISHMENT_KEY_EXCEPTION,
  ESTABLISHMENT_KEY_LINK_EDIT,
  ORGANIZATION_KEY_EXCEPTION,
  ORGANIZATION_KEY_LINK_EDIT,
  SERVICE_KEY_EXCEPTION,
  SLOT_KEY_EXCEPTION,
  USER_KEY_EXCEPTION
} from "@/constants/admin"
import {
  EMPLOYEE_API_ROUTES,
  EMPLOYEESPECIFICSCHEDULE_API_ROUTES,
  EMPLOYEEWEEKSCHEDULE_API_ROUTES,
  ESTABLISHMENT_API_ROUTES,
  ORGANIZATION_API_ROUTES,
  SERVICE_API_ROUTES,
  SLOT_API_ROUTES,
  USER_API_ROUTES
} from "@/constants/db"
import {
  employeesHeader,
  employeesSpecificSchedulesHeader,
  employeesWeekSchedulesHeader,
  establishmentsHeader,
  notationsHeader,
  organizationsHeader,
  servicesHeader,
  slotsHeader,
  usersHeader
} from "@/constants/tableHeaders"
import { editEmployee, fetchEmployee, fetchEmployees } from "@/lib/employees"
import {
  editEmployeeWeekSchedule,
  fetchEmployeeWeekSchedule,
  fetchEmployeeWeekSchedules
} from "@/lib/employeeSchedule"
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
import { fetchNotations } from "@/lib/notations"
import {
  editOrganization,
  fetchOrganization,
  fetchOrganizations
} from "@/lib/organizations"
import { editService, fetchService, fetchServices } from "@/lib/services"
import { editSlot, fetchSlot, fetchSlots } from "@/lib/slots"
import { editUser, fetchUser, fetchUsers } from "@/lib/users"
import FormPostEmployee from "@/components/admin/form-post-employee"
import FormPostSpecificSchedules from "@/components/admin/form-post-employeeSpecificSchedules"
import FormPostWeekSchedules from "@/components/admin/form-post-employeeWeekSchedules"
import FormPostEstablishment from "@/components/admin/form-post-establishment"
import FormPostNotation from "@/components/admin/form-post-notation"
import FormPostOrganisation from "@/components/admin/form-post-organisation"
import FormPostService from "@/components/admin/form-post-service"
import FormPostSlot from "@/components/admin/form-post-slot"
import FormPostUser from "@/components/admin/form-post-user"
import ItemId from "@/components/admin/ItemId"
import AdminView from "@/components/AdminView"
import Layout from "@/components/Layout"
import EmployeeSpecificScheduleRows from "@/components/Rows/admin/EmployeeSpecificScheduleRows"
import EmployeesRows from "@/components/Rows/admin/EmployeesRows"
import EmployeeWeekScheduleRows from "@/components/Rows/admin/EmployeesWeekSchedulesRows"
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
import SigninOrgaEmployee from "@/pages/auth/SigninOrgaEmployee"
import MyOrganisation from "@/pages/mon-organisation"
import MyServices from "@/pages/my-services"
import MyAccount from "@/pages/MyAccount"
import NewEstablisement from "@/pages/new-establishment"
import PendingOrganizations from "@/pages/pending-organisations"
import ReservationCreneau from "@/pages/reservation-creneau"
import ReservationHistory from "@/pages/reservation-history"
import ReservationService from "@/pages/reservation-service"
import ReservationUser from "@/pages/reservations-user"
import EmployeeSchedule from "@/pages/schedule-employee"
import SpecificScheduleEmployee from "@/pages/specific-schedule-employee"

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
const organisationRoutes: RouteObject[] = [
  {
    path: "/mon-organisation",
    element: getLayout(<MyOrganisation />)
  },
  {
    path: "/new-establishment/:organisationId",
    element: getLayout(<NewEstablisement />)
  },
  {
    path: "/schedule/:employeeId",
    element: getLayout(<EmployeeSchedule />)
  },
  {
    path: "/specific-schedule/:employeeId",
    element: getLayout(<SpecificScheduleEmployee />)
  },
  {
    path: "/my-specific-schedule/:employeeId",
    element: getLayout(<SpecificScheduleEmployee />)
  },
  {
    path: "/my-services/:employeeId",
    element: getLayout(<MyServices />)
  }
]
const employeeRoutes: RouteObject[] = []
const defaultRoutes: RouteObject[] = [
  {
    path: "/",
    element: getLayout(<App />)
  },
  {
    path: "/reservation-service/:idEmployee",
    element: getLayout(<ReservationService />)
  },
  {
    path: "/reservation-history/:id", //id of employee or organisations
    element: getLayout(<ReservationHistory />)
  },
  {
    path: "/reservations/:idUser",
    element: getLayout(<ReservationUser />)
  },
  {
    path: "/reservation-creneau/:idReservation",
    element: getLayout(<ReservationCreneau />)
  },
  {
    path: "/profil",
    element: getLayout(<MyAccount />)
  },
  {
    path: "admin/pending-organizations",
    element: getLayout(<PendingOrganizations />, true)
  }
]
const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: getLayout(<Login />)
  },
  {
    path: "/signin/organization",
    element: getLayout(<SigninOrgaEmployee />)
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
        ModalPost={FormPostUser}
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
        ModalPost={FormPostSlot}
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
        ModalPost={FormPostService}
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
        ModalPost={FormPostOrganisation}
        Rows={OrganizationsRows}
        promiseFetch={fetchOrganizations}
        header={organizationsHeader}
      />,
      true
    )
  },
  {
    path: "/admin/notations",
    element: getLayout(
      <AdminView
        ModalPost={FormPostNotation}
        Rows={NotationsRows}
        promiseFetch={fetchNotations}
        header={notationsHeader}
      />,
      true
    )
  },
  {
    path: "/admin/establishments",
    element: getLayout(
      <AdminView
        ModalPost={FormPostEstablishment}
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
        ModalPost={FormPostEmployee}
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
        ModalPost={FormPostSpecificSchedules}
        Rows={EmployeeSpecificScheduleRows}
        promiseFetch={fetchEmployeeSpecificSchedules}
        header={employeesSpecificSchedulesHeader}
      />,
      true
    )
  },
  {
    path: "/admin/employeeWeekSchedules",
    element: getLayout(
      <AdminView
        ModalPost={FormPostWeekSchedules}
        Rows={EmployeeWeekScheduleRows}
        promiseFetch={fetchEmployeeWeekSchedules}
        header={employeesWeekSchedulesHeader}
      />,
      true
    )
  },
  {
    path: "/admin/users/:id",
    element: getLayout(
      <ItemId
        route={USER_API_ROUTES}
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
        route={SLOT_API_ROUTES}
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
        route={SERVICE_API_ROUTES}
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
        route={ORGANIZATION_API_ROUTES}
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
        route={ESTABLISHMENT_API_ROUTES}
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
        route={EMPLOYEE_API_ROUTES}
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
        route={EMPLOYEESPECIFICSCHEDULE_API_ROUTES}
        fetchItem={fetchEmployeeSpecificSchedule}
        dataKeyException={EMPLOYEE_SPECIFIC_SCHEDULE_KEY_EXCEPTION}
        editFunctions={editEmployeeSpecificSchedule}
      />,
      true
    )
  },
  {
    path: "/admin/employeeWeekSchedules/:id",
    element: getLayout(
      <ItemId
        route={EMPLOYEEWEEKSCHEDULE_API_ROUTES}
        fetchItem={fetchEmployeeWeekSchedule}
        dataKeyException={EMPLOYEE_WEEK_SCHEDULE_KEY_EXCEPTION}
        editFunctions={editEmployeeWeekSchedule}
      />,
      true
    )
  }
]

export const routes: RouteObject[] = [
  ...defaultRoutes,
  ...adminRoutes,
  ...organisationRoutes,
  ...employeeRoutes,
  ...authRoutes,
  {
    path: "/*",
    element: getLayout(<div>404</div>)
  }
].map((route) => ({ ...route, errorElement: getLayout(<Error />) }))
