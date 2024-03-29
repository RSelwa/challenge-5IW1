import React from "react"
import { SewingPinIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"

type Props = {
  urlImage: string
  name: string
  profession: string
  // service: string
  address: string
  zipCode: string
  employeeId: string
}

const ProfileSearch = (props: Props) => {
  return (
    <div>
      <div className="flex gap-4">
        <img
          src="/avatar.jpg"
          alt="avatar"
          className="aspect-square h-24 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <p className="text-blue-500">
            {props.name} - {props.profession}
          </p>
          {/* <p className="text-sm font-bold text-gray-900">{props.service}</p> */}
          <div className="mt-3 flex gap-2 ">
            <SewingPinIcon color="gray" className="mt-1" />
            <p>
              {props.address}
              <br />
              {props.zipCode}
            </p>
          </div>
        </div>
      </div>
      <div className="ml-24 mt-4">
        <Link
          className="flex w-fit items-center justify-center rounded bg-blue-700 px-8 py-2 text-white"
          to={`/reservation-service/${props.employeeId}`}
        >
          Prendre rendez-vous
        </Link>
      </div>
    </div>
  )
}

export default ProfileSearch
