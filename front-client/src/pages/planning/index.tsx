import { useState } from "react"
import {
  differenceDaysBetweenTwoDates,
  getDateFromWeek,
  getInitialDay
} from "monorepo/utils/date"

const Planning = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const { firstday, lastday } = getDateFromWeek(currentDate)
  console.log(firstday)
  console.log(lastday)
  console.log(differenceDaysBetweenTwoDates(firstday, lastday))

  for (
    let index = 0;
    index < differenceDaysBetweenTwoDates(firstday, lastday);
    index++
  ) {
    console.log(index)
  }

  return (
    <div>
      {Array.from(Array(differenceDaysBetweenTwoDates(firstday, lastday))).map(
        (e, i) => (
          <div>{i}</div>
        )
      )}
    </div>
  )
}

export default Planning
