import { CircularProgress } from '@mui/material'
import Landing from 'pages/Landing'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

const Cart = lazy(() => import('./pages/Cart'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Details = lazy(() => import('./pages/Details'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Order = lazy(() => import('./pages/Order'))
const Statistics = lazy(() => import('./pages/Statistics'))
const Products = lazy(() => import('./pages/Products'))
const AboutUs = lazy(() => import('./pages/AboutUs'))

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details/:productID" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:orderID" element={<Order />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Suspense>
  )
}

export default App
