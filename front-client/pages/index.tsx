import { useAppSelector } from "@/redux/hook";
import { selectEmail } from "@/redux/user/userSlice";

export default function Home() {
  const userEmail = useAppSelector(selectEmail)
  console.log(userEmail);
  
  return (
    <main>test </main>
  );
}
