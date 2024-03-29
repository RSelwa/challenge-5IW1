import React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import LoginWithPassword from "@/components/auth/Login"
import SigninUsers from "@/components/auth/Signin/users"
import { Translate } from "react-auto-translate"


const Login = () => {
  return (
    <div className="h-[calc(100vh-64px)] bg-blue-50">
      <Accordion.Root
        className="flex flex-col gap-8 py-8"
        type="single"
        defaultValue="login"
        collapsible
      >
        <Accordion.Item
          className="mx-auto w-1/2 rounded bg-white p-4"
          value="login"
        >
          <Accordion.Trigger className=" w-full text-center text-lg font-bold">
            <Translate>J'ai déjà un compte Doctoges</Translate>
          </Accordion.Trigger>
          <Accordion.Content className="mt-6">
            <LoginWithPassword />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item
          className="mx-auto w-1/2 rounded bg-white p-4"
          value="signin"
        >
          <Accordion.Trigger className=" w-full text-center text-lg font-bold">
           <Translate>Nouveau sur Doctoges ?</Translate> 
          </Accordion.Trigger>
          <Accordion.Content className="mt-6">
            <SigninUsers />
          </Accordion.Content>
        </Accordion.Item>
        {/* <Accordion.Item
          className="mx-auto w-1/2 rounded bg-white p-4"
          value="organisation"
        >
          <Accordion.Trigger className=" w-full text-center text-lg font-bold">
            Organization
          </Accordion.Trigger>
          <Accordion.Content className="mt-6">
            <SigninEntreprises />
          </Accordion.Content>
        </Accordion.Item> */}
      </Accordion.Root>
    </div>
  )
}

export default Login
