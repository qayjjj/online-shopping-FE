import { CircularProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'

const Cart = React.lazy(() => import('./pages/Cart'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Details = React.lazy(() => import('./pages/Details'))

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
      </Routes>
    </Suspense>
  )
}

export default App
