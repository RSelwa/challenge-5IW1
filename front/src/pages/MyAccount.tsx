import React from "react"
import UserInfosForm from "@/pages/UserInfosForm"
import Notation from "../components/Notations"
import { Translator, Translate } from 'react-auto-translate';


const MyAccount = () => {
  return (
    
    <div className="h-[calc(100vh-64px)] bg-blue-100 p-8">
      <div className="mx-auto w-10/12 rounded bg-white p-2 ">
        <h1 className="mb-6 mt-2 text-left text-xl font-black text-neutral-900">
        <Translate>
          Mes informations
          </Translate>
        </h1>
        <UserInfosForm />
      </div>
      <Notation idTarget={"user333"} />
    </div>
    
  )
}

export default MyAccount
