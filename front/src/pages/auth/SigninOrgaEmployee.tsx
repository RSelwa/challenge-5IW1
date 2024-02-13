import React from "react"
import { Translate } from "react-auto-translate"
import SigninOrganizationForm from "@/components/auth/Signin/signinOrganizationForm"

const SigninOrgaAndEmployee = () => {
  return (
    <div className="h-[calc(100vh-64px)]">
      <div className="mx-auto mt-4 flex w-1/2 flex-col gap-8 rounded bg-white p-4 py-8">
        <p className=" w-full text-center text-lg font-bold">
          <Translate>S'enregistrer en tant qu'organisation ?</Translate>
        </p>
        <SigninOrganizationForm />
      </div>
    </div>
  )
}

export default SigninOrgaAndEmployee
