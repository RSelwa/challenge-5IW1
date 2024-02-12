export const deleteEntity = async (id: string, route: string) => {
  const newHeader = new Headers()
  newHeader.append("Content-Type", "application/json")
  newHeader.append(
    "Authorization",
    `Bearer ${localStorage.getItem("token")?.replaceAll('"', "") || ""}`
  )
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}${route}/${id}`,
    {
      method: "DELETE",
      headers: newHeader
    }
  )
  if (!response.ok) throw new Error("Something went wrong")
}
