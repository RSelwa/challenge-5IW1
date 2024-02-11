import { useEffect, useState } from "react"
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { ReservationCounts, ReservationData } from "@/types/api/slots"
import { OrganizationsWithId } from "@/types/withId"
import { fetchOrganization } from "@/lib/organizations"
import { parseJwt } from "@/utils/redux"

const DashboardOrga = () => {
  const { id } = parseJwt(localStorage.getItem("token") || "")
  const [isLoading, setIsLoading] = useState(false)
  const [organisation, setOrganisation] = useState<OrganizationsWithId>()
  const [reservationData, setReservationData] = useState<ReservationData[]>([])
  const [barChartData, setBarChartData] = useState<
    { name: string; reservations: number }[]
  >([])

  const fechMyOrga = async () => {
    setIsLoading(true)
    try {
      const orga = await fetchOrganization(id)
      setOrganisation(orga)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fechMyOrga()
  }, [])

  // useEffect(() => {
  // if (organisation) {
  //   // Déterminez la semaine actuelle
  //   const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  //   const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  //   const daysOfWeek = eachDayOfInterval({ start, end });

  //   // Créez un objet qui contient une clé pour chaque nom d'établissement avec une valeur de 0
  //   const establishmentCounts: ReservationCounts = organisation.establishments.reduce((acc, establishment) => {
  //     acc[establishment.name] = 0; // Initialisez chaque établissement avec 0 réservation
  //     return acc;
  //   }, {});

  //   // Initialisez les données de réservation pour chaque jour de la semaine
  //   const initialData: ReservationData[] = daysOfWeek.map(day => {
  //     const dateFormatted = format(day, 'yyyy-MM-dd');
  //     // Utilisez l'opérateur de propagation pour copier les comptes d'établissement initialisés
  //     return { date: dateFormatted, ...establishmentCounts };
  //   });

  //   // Comptez les réservations pour chaque établissement et chaque jour
  //   organisation.establishments.forEach(establishment => {
  //     establishment.employees.forEach(service => {
  //       service.slots.forEach(slot => {
  //         const slotDate = format(new Date(slot.startTime), 'yyyy-MM-dd');
  //         const dayData = initialData.find(d => d.date === slotDate);
  //         if (dayData) {
  //           dayData[establishment.name] += 1;
  //         }
  //       });
  //     });
  //   });

  //   setReservationData(initialData);
  //   // }
  // }, [organisation]);

  const filterData = (
    establishments: OrganizationsWithId["establishments"]
  ) => {
    console.log(organisation?.establishments)

    const dataForBarChart = establishments.map((establishment) => {
      const totalReservations = 0
      const x = establishment.employees
        .map((employee) => employee.services)
        .map((service) => (service ? service?.slots : []))
      // .flat()
      return {
        name: establishment.name,
        reservations: totalReservations
      }
    })
    // console.log(dataForBarChart)
    setBarChartData(dataForBarChart)
  }
  useEffect(() => {
    if (organisation) filterData(organisation.establishments)
  }, [organisation])

  return (
    <div>
      <h1>Reservations This Week</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={reservationData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {organisation?.establishments.map((establishment) => (
            <Line
              key={establishment.id}
              type="monotone"
              dataKey={establishment.name}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DashboardOrga
