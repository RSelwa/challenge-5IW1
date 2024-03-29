import React from "react"
import { Translate } from "react-auto-translate"
import UserInfosForm from "@/pages/UserInfosForm"

const MyAccount = () => {
  return (
    <div className="h-[calc(100vh-64px)] bg-blue-100 p-8">
      <div className="mx-auto w-10/12 rounded bg-white p-2 ">
        <h1 className="mb-6 mt-2 text-left text-xl font-black text-neutral-900">
          <Translate>Mes informations</Translate>
        </h1>
        <UserInfosForm />
      </div>
    </div>
  )
}

export default MyAccount
