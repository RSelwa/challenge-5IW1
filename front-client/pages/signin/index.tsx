import Btn from "@/front-client/components/btn"
import Button from "@/monorepo/components/ui/Button"


type Test = {
  label?:string
}
const Signin = (p:Test) => {
  return (
    <div>
      <form>
        {/* <Input variant={"default"} stateRegister={""} register={undefined} /> */}
        {/* <Button  onClick={()=>console.log('test')}/> */}
        test {p.label}
        <Btn text="dsfdf" />
      </form>
    </div>
  )
}

export default Signin
