import React, { useEffect, useState } from "react"
import { servicesList } from "@/constants/utils"
import { getRandomInt } from "@/utils"

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
      Trouvez un rendez-vous avec
      <br />
      <span className="text-blue-200">{servicesList[count]}</span>
    </h1>
  )
}

export default UserTitle
