import React, { useEffect } from "react"
import { Router, useNavigate, useParams } from "react-router-dom"
import { DbTableLogin } from "@/types/auth"
import { dbTableLogin } from "@/constants/auth"
import LoginWithPassword from "@/components/Forms/Login"

const Login = () => {
  return <LoginWithPassword />
}

export default Login
