import React, { useEffect, useState } from "react"
import { servicesList } from "@/constants/utils"
import { getRandomInt } from "@/utils"
import { Translate } from "react-auto-translate"


const UserTitle = () => {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(
      () => setCount(getRandomInt(0, servicesList.length - 1)),
      3000
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <h1 className="font-6xl text-center font-black text-white">
      <Translate>Trouvez un rendez-vous avec</Translate>
      <br />
      <span className="text-blue-200">{servicesList[count]}</span>
    </h1>
  )
}

export default UserTitle
