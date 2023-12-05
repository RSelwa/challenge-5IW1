import React from "react"
import { SewingPinIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"

type Props = {
  urlImage: string
  name: string
  service: string
  address: string
  zipCode: string
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
          <p className="text-blue-500">{props.name}</p>
          <p className="text-sm font-bold text-gray-900">{props.service}</p>
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
        <Button className="">Prendre rendez-vous</Button>
      </div>
    </div>
  )
}

export default ProfileSearch
