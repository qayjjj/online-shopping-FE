import { CircularProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

const Cart = React.lazy(() => import('./pages/Cart'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Details = React.lazy(() => import('./pages/Details'))
const Checkout = React.lazy(() => import('./pages/Checkout'))
const Order = React.lazy(() => import('./pages/Order'))
const Statistics = React.lazy(() => import('./pages/Statistics'))

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
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
