import React from "react"

type Props = {
  object: any
}

const DynamicForm = (props: Props) => {
  return (
    <div>
      {Object.entries(props.object).map(([key, value]) => (
        <div key={key}>
          <label>{key}:</label>
          {value as string}
        </div>
      ))}
    </div>
  )
}

export default DynamicForm
