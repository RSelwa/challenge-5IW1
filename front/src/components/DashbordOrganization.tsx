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

  useEffect(() => {
    const chartData = filterData(establishment)
    setData(chartData)

    const totalReservations = chartData.datasets[0].data.reduce(
      (acc, curr) => acc + curr,
      0
    )
    setHasReservations(totalReservations > 0)
  }, [establishment])

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
  const [hasReservations, setHasReservations] = useState<boolean>(false)
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

  return (
    <div className=" flex flex-col ">
      <div className="  flex items-center">
        <BarChartIcon />

        <h1 className="text-lg font-bold">
          <Translate>Total des réservations par établissements</Translate>
        </h1>
      </div>

      {hasReservations ? (
        <div className="w-3/5 min-w-[320px]">
          <Bar datasetIdKey="id" data={data} options={options} />
        </div>
      ) : (
        <p>
          <Translate>Vous n'avez aucun service réservé.</Translate>
        </p>
      )}
    </div>
  )
}

export default DashboardOrga
