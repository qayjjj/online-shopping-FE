import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { Person, ShoppingCart } from '@mui/icons-material'
import { verifyToken } from 'services/user.service'

export default function Navbar(props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && token !== '') {
      verifyToken({ token })
        .then(() => setLoggedIn(true))
        .catch((e) => console.log(e))
    }
  }, [])

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

      {loggedIn ? (
        <div className="flex">
          <ShoppingCart
            className="cursor-pointer hover:drop-shadow-md text-[#6c63ff]"
            onClick={() => navigate('/cart')}
          />
          <Person
            className="cursor-pointer hover:drop-shadow-md text-[#6c63ff] ml-5"
            onClick={() => navigate('/dashboard')}
          />
        </div>
      ) : (
        <Button
          variant="contained"
          className="ml-4"
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
      )}
    </div>
  )
}
