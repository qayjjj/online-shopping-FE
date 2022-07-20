import React, { useState } from 'react'
import {
  RadioButtonChecked,
  GridView,
  ShoppingCart,
  BarChart,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navigation() {
  const [showNavigation, setShowNavigation] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div
      id="wrapper"
      className={`z-[999] border-r-[0.1rem] py-4 shadow-2xl h-screen fixed top-0 left-0 bg-white ease-in-out duration-300 overflow-hidden ${
        showNavigation ? 'w-64 px-4' : 'w-12 px-1'
      }`}
    >
      <div
        className={`grid ${
          showNavigation ? 'justify-items-end' : 'justify-items-center'
        }`}
      >
        <RadioButtonChecked
          className="cursor-pointer text-gray-400 hover:text-[#6c63ff]"
          onClick={() => setShowNavigation((prev) => !prev)}
        />
      </div>
      <div className="flex flex-col mt-6">
        <div
          className={`flex justify-start py-2 px-2 mt-6 cursor-pointer hover:text-[#6c63ff] hover:bg-gray-100 rounded-md
          ${
            pathname == '/dashboard'
              ? 'text-[#6c63ff] bg-gray-100'
              : 'text-gray-400'
          }
          `}
          onClick={() => navigate('/dashboard')}
        >
          <GridView />
          <h1 className="ml-3">Dashboard</h1>
        </div>
        <div
          className={`flex justify-start py-2 px-2 mt-6 cursor-pointer  hover:text-[#6c63ff] hover:bg-gray-100 rounded-md
          ${
            pathname == '/cart' ? 'text-[#6c63ff] bg-gray-100' : 'text-gray-400'
          }
          `}
          onClick={() => navigate('/cart')}
        >
          <ShoppingCart />
          <h1 className="ml-3">Cart</h1>
        </div>
        <div
          className={`flex justify-start py-2 px-2 mt-6 cursor-pointer hover:text-[#6c63ff] hover:bg-gray-100 rounded-md
          ${
            pathname == '/statistics'
              ? 'text-[#6c63ff] bg-gray-100'
              : 'text-gray-400'
          }
          `}
          onClick={() => navigate('/statistics')}
        >
          <BarChart />
          <h1 className="ml-3">Statistics</h1>
        </div>
      </div>
    </div>
  )
}
