import { useEffect, useRef, useState } from "react"
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartDataset,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import { ReservationCounts, ReservationData } from "@/types/api/slots"
import { OrganizationsWithId } from "@/types/withId"
import { establishmentsHeader } from "@/constants/tableHeaders"
import { fetchOrganization } from "@/lib/organizations"
import { parseJwt } from "@/utils/redux"

type ChartData = {
  // id: number
  labels: string[]
  datasets: { label?: string; data: number[] }[]
}
const DashboardOrga = () => {
  const { id } = parseJwt(localStorage.getItem("token") || "")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ChartData>({
    // id: 1,
    datasets: [{ data: [], label: "slots" }],

    labels: ["slots"]
  })
  const [organisation, setOrganisation] = useState<OrganizationsWithId>()
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
    LineElement,
    BarController,
    BarElement,
    Colors
  )

  const filterData = (
    establishments: OrganizationsWithId["establishments"]
  ) => {
    const dataForBarChart: ChartData = {
      labels: ["slots"],
      datasets: [
        {
          data: []
        }
      ]
    }
    establishments.forEach((establishment, i) => {
      const allOrganisationEmployees = establishment.employees
      const allServices = allOrganisationEmployees
        .map((employee) => employee.services)
        .flat()

      const allSlots = allServices.map((service) => service.slots).flat()

      dataForBarChart.labels[i] = establishment.name
      dataForBarChart.datasets[0].data.push(allSlots.length)
    })

    setData(dataForBarChart)
  }

  const fechMyOrga = async () => {
    setIsLoading(true)
    try {
      const orga = await fetchOrganization(id)
      if (!orga || !orga?.establishments) return
      setOrganisation(orga)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fechMyOrga()
  }, [])

  useEffect(() => {
    if (organisation && organisation.establishments)
      filterData(organisation.establishments)
  }, [organisation])

  return (
    <div>
      <Bar datasetIdKey="id" data={data} />
    </div>
  )
}

export default DashboardOrga
