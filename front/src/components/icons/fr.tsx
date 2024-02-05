import React from "react"

const FrenchFlag = ({ size = 16 }: { size?: number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size * 1.5} height={size}>
      <rect width={size * 2} height={size} fill="#ED2939" />
      <rect width={size * 1} height={size} fill="#fff" />
      <rect width={size * 0.5} height={size} fill="#002395" />
    </svg>
  )
}

export default FrenchFlag
{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600"><rect width="900" height="600" fill="#ED2939"/><rect width="600" height="600" fill="#fff"/><rect width="300" height="600" fill="#002395"/></svg> */
}
