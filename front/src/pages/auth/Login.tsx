<<<<<<< Updated upstream
import React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import LoginWithPassword from "@/components/auth/Login"
import SigninUsers from "@/components/auth/Signin/users"

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
            J'ai déjà un compte Doctolib
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
            Nouveau sur Doctolib ?
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
=======
import React, { useEffect } from "react"
import { Router, useNavigate, useParams } from "react-router-dom"
import { DbTableLogin } from "@/types/auth"
import { dbTableLogin } from "@/constants/auth"
import LoginWithPassword from "@/components/Forms/Login"

const Login = () => {
  return <LoginWithPassword />
}

export default Login
>>>>>>> Stashed changes
