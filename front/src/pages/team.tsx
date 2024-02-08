import { useParams } from "react-router-dom"
import { Translate } from "react-auto-translate"


const Team = () => {
  const { teamId } = useParams<{ teamId: string }>()
  console.log(teamId)

  return <div><Translate>Equipe {teamId}</Translate></div>
}

export default Team
