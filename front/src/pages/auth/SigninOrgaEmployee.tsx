import React from "react"
import * as Accordion from "@radix-ui/react-accordion"
import SigninOrganizationForm from "@/components/auth/Signin/signinOrganizationForm"
import SigninEmployeeForm from "@/components/auth/Signin/signinEmployeeForm"
import { Translate } from "react-auto-translate"


const SigninOrgaAndEmployee = () => {
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
           <Translate> S'enregistrer en tant qu'employée ?</Translate>
          </Accordion.Trigger>
          <Accordion.Content className="mt-6">
            <SigninEmployeeForm />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item
          className="mx-auto w-1/2 rounded bg-white p-4"
          value="signin"
        >
          <Accordion.Trigger className=" w-full text-center text-lg font-bold">
            <Translate>S'enregistrer en tant qu'organisation ?</Translate>
          </Accordion.Trigger>
          <Accordion.Content className="mt-6">
            <SigninOrganizationForm />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  )
}

export default SigninOrgaAndEmployee
