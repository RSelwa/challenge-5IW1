import React from 'react'

type Props = {
    text:string
}

const Btn = ({text}: Props) => {
  return (
    <div>{text}</div>
  )
}

export default Btn