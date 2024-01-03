import React from "react"
import { Button } from "@radix-ui/themes"
import { Link } from "react-router-dom"


const MyAccount = () => {
  return (
    <div>
      <h1 className="mt-3 text-center text-3xl font-black italic">
         My Account
      </h1>
      {/* <div className="mx-auto mt-12 flex w-10/12 flex-wrap justify-center gap-4 ">
        {myAccountRoutes
          .filter(
            (route) => !route.path?.includes(":id") && route.path !== "/admin"
          )
          .map((route, index) => (
            <Link key={index} to={route.path || ""}>
              <Button className="bg-amber-500 hover:bg-amber-700">
                {route.path?.replace("/myAccount/", "")}{" "}
              </Button>
            </Link>
          ))}
      </div> */}
    </div>
  )
}

export default MyAccount
