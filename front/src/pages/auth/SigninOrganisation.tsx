import React from "react"
import SigninOrganizationForm from "@/components/auth/Signin/signinOrganizationForm"

const SigninOrganization = () => {
  return (
    <div className="h-[calc(100vh-64px)] bg-blue-100 p-8">
      <div className="mx-auto w-10/12 rounded bg-white p-2 ">
        <h1 className="mb-6 mt-2 text-center text-xl font-black text-neutral-900">
          S'enregistrer en tant qu'entreprises
        </h1>
        <SigninOrganizationForm />
      </div>
    </div>
  )
}

export default SigninOrganization
