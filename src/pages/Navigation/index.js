import React, { useState } from 'react'
import { RadioButtonChecked, GridView, ShoppingCart } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Navigation() {
  const [showNavigation, setShowNavigation] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      id="wrapper"
      className={`z-[999] border-r-[0.1rem] py-4 shadow-2xl h-screen fixed top-0 left-0 bg-white ease-in-out duration-300 overflow-hidden ${
        showNavigation ? 'w-64 px-4' : 'w-12 px-3'
      }`}
    >
      <div
        className={`grid ${
          showNavigation ? 'justify-items-end' : 'justify-items-center'
        }`}
      >
        <RadioButtonChecked
          className="cursor-pointer text-gray-500 hover:text-blue-500"
          onClick={() => setShowNavigation((prev) => !prev)}
        />
      </div>
      <div className="flex flex-col mt-6">
        <div
          className="flex justify-start cursor-pointer text-gray-500 hover:text-blue-500"
          onClick={() => navigate('/dashboard')}
        >
          <GridView />
          <h1 className="ml-3">Dashboard</h1>
        </div>
        <div
          className="flex justify-start mt-6 cursor-pointer text-gray-500 hover:text-blue-500"
          onClick={() => navigate('/cart')}
        >
          <ShoppingCart />
          <h1 className="ml-3">Cart</h1>
        </div>
      </div>
    </div>
  )
}
