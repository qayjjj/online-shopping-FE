import React from 'react'
import moving from 'assets/img/moving.svg'
import { Card } from '@mui/material'
import { Person, Inventory } from '@mui/icons-material'

export default function LandingBanner(props) {
  return (
    <div className="flex w-full">
      <div className="w-1/3 mt-6 relative">
        <h1 className="text-4xl font-bold">
          Brilliant decisions for your home.
        </h1>
        <p className="mt-4 leading-9 text-gray-500">
          Making your home a wonderful, exciting and welcoming space has never
          been easier.
        </p>
        <div className="absolute bottom-[4.5rem] left-0 flex items-center">
          <Card className="w-10 h-10 grid place-items-center text-[#6c63ff]">
            <Person />
          </Card>
          <div className="ml-4">
            <p className="text-2xl font-semibold">
              {props.isLoading ? '-' : props.userCount}
            </p>
            <p className="text-sm text-gray-400">Users</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 flex items-center">
          <Card className="w-10 h-10  grid place-items-center text-[#6c63ff]">
            <Inventory />
          </Card>
          <div className="ml-4 ">
            <p className="text-2xl font-semibold">
              {props.isLoading ? '-' : props.productCount}
            </p>
            <p className="text-sm text-gray-400">Products</p>
          </div>
        </div>
      </div>
      <div className="w-7/12 relative">
        <img src={moving} />
      </div>
    </div>
  )
}
