import { useEffect, useRef, useState } from "react"
import { BarChartIcon } from "@radix-ui/react-icons"
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartDataset,
  Chart as ChartJS,
  Color,
  Colors,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js"
import { Translate } from "react-auto-translate"
import { Bar, Line } from "react-chartjs-2"
import { OrganizationsWithId } from "@/types/withId"

type ChartData = {
  labels: string[]
  datasets: { label?: string; data: number[]; backgroundColor: Color[] }[]
}
type Props = {
  establishment: OrganizationsWithId["establishments"]
}

const DashboardOrga = ({ establishment }: Props) => {
  const barColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#F77825",
    "#9966FF",
    "#00D96F"
  ]

  const filterData = (
    establishments: OrganizationsWithId["establishments"]
  ) => {
    const dataForBarChart: ChartData = {
      labels: ["slots"],
      datasets: [
        {
          data: [],
          backgroundColor: []
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
      dataForBarChart.datasets[0].label = "slots"
      dataForBarChart.datasets[0].backgroundColor.push(
        barColors[i % barColors.length]
      )
    })

    return dataForBarChart
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          //  fonction de rappel pour transformer les ticks en nombres entiers
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value
            }
          }
        }
      }
    }
  }

  const [data, setData] = useState<ChartData>(filterData(establishment))
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

  // const fechMyOrga = async () => {
  //   setIsLoading(true)
  //   try {
  //     const orga = await fetchOrganization(id)
  //     if (!orga || !orga?.establishments) return
  //     setOrganisation(orga)
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   setIsLoading(false)
  // }

  // useEffect(() => {
  //   fechMyOrga()
  // }, [])

  // useEffect(() => {
  //   if (organisation && organisation.establishments)
  //     filterData(organisation.establishments)
  // }, [organisation])

  return (
    <div className=" flex flex-col ">
      <div className="  flex items-center">
        <BarChartIcon />

        <h1 className=" text-lg font-bold">
          Total des réservations par établissements
        </h1>
      </div>

      <div className="w-3/5 min-w-80">
        <Bar datasetIdKey="id" data={data} options={options} />
      </div>
    </div>
  )
}

export default DashboardOrga
