import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Popover } from '@mui/material'
import {
  Person,
  GridView,
  BarChart,
  ShoppingCart,
  Logout,
  Chat,
} from '@mui/icons-material'

import { verifyToken } from 'services/user.service'

export default function Navbar(props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [navbarType, setNavbarType] = useState('')
  const [anchor, setAnchor] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && token !== '') {
      verifyToken({ token })
        .then(() => setNavbarType('avatar'))
        .catch((e) => console.log(e))
    } else {
      setNavbarType('button')
    }
  }, [])

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="px-32 py-8 flex items-center justify-between">
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate('/')}
      >
        CompanyName.
      </h1>
      <div className="flex items-center font-medium text-gray-500">
        <div
          className={`cursor-pointer hover:drop-shadow-lg ${
            pathname == '/' && 'text-black'
          }`}
          onClick={() => navigate('/')}
        >
          Home
        </div>
        <div
          className={`cursor-pointer hover:drop-shadow-lg ml-20 ${
            pathname == '/products' && 'text-black'
          }`}
          onClick={() => navigate('/products')}
        >
          Products
        </div>
        <div
          className={`cursor-pointer hover:drop-shadow-lg ml-20 ${
            pathname == '/about-us' && 'text-black'
          }`}
          onClick={() => navigate('/about-us')}
        >
          About Us
        </div>
      </div>
      <div className="min-w-[3rem]">
        {navbarType == 'avatar' ? (
          <div>
            <Person
              className="cursor-pointer hover:drop-shadow-md text-[#6c63ff] ml-5"
              onClick={(e) => setAnchor(e.currentTarget)}
            />
            <Popover
              className="mt-2"
              open={anchor}
              anchorEl={anchor}
              onClose={() => setAnchor(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Card className="px-4 py-4">
                <div
                  className="flex items-center hover:text-[#6c63ff] cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                >
                  <GridView className="text-base" />
                  <h1 className="ml-3 text-sm">Dashboard</h1>
                </div>
                <div
                  className="mt-2 flex items-center hover:text-[#6c63ff] cursor-pointer"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="text-base" />
                  <h1 className="ml-3 text-sm">Cart</h1>
                </div>
                <div
                  className="mt-2 flex items-center hover:text-[#6c63ff] cursor-pointer"
                  onClick={() => navigate('/statistics')}
                >
                  <BarChart className="text-base" />
                  <h1 className="ml-3 text-sm">Statistics</h1>
                </div>
                <div
                  className="mt-2 flex items-center hover:text-[#6c63ff] cursor-pointer"
                  onClick={() => navigate('/chat')}
                >
                  <Chat className="text-base" />
                  <h1 className="ml-3 text-sm">Chat</h1>
                </div>
                <div
                  className="mt-2 flex items-center hover:text-[#6c63ff] cursor-pointer"
                  onClick={handleLogOut}
                >
                  <Logout className="text-base" />
                  <h1 className="ml-3 text-sm">Log out</h1>
                </div>
              </Card>
            </Popover>
          </div>
        ) : (
          navbarType == 'button' && (
            <Button
              variant="contained"
              className="ml-4"
              onClick={() =>
                navigate('/login', { state: { currentPage: pathname } })
              }
            >
              Log In
            </Button>
          )
        )}
      </div>
    </div>
  )
}
