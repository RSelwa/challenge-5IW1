import { useParams } from "react-router-dom"

const Team = () => {
  const { teamId } = useParams<{ teamId: string }>()
  console.log(teamId)

  return <div>Team {teamId}</div>
}

export default Team
