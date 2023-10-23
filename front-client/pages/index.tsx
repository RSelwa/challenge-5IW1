import { useAppSelector } from "@/front-client/redux/hook"
import { selectEmail } from "@/front-client/redux/user/userSlice"

export default function Home() {
  const userEmail = useAppSelector(selectEmail)
  console.log(userEmail)

  return <main>test </main>
}
