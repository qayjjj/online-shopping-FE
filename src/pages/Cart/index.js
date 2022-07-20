import { Button, Grid, Card } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTotalCartValue, viewCart } from 'services/cart.service'
import Navigation from 'components/Navigation'
import OrderSummary from './OrderSummary'
import OrderTable from './OrderTable'
import CartSkeleton from './Skeleton'

export default function Cart() {
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [items, setItems] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleViewCart = () => {
    const token = localStorage.getItem('token')
    setIsLoading(true)
    viewCart({ token })
      .then((res) => setItems(res.data.message))
      .then(() =>
        getTotalCartValue({
          token: localStorage.getItem('token'),
        }).then((res) => setTotalValue(res.data.message)),
      )
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(false)
      })
  }

  useEffect(() => handleViewCart(), [])

  return (
    <div className="px-32 py-24">
      <div className="relative">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <Button className="absolute -top-10 right-0" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
      {isLoading ? (
        <CartSkeleton />
      ) : (
        <Grid container spacing={2} className="h-[30rem] mt-6">
          <Grid item md={8}>
            <OrderTable items={items} handleViewCart={handleViewCart} />
          </Grid>
          <Grid item md={4}>
            <Card className="px-10 py-6">
              <OrderSummary totalValue={totalValue} />
            </Card>
          </Grid>
        </Grid>
      )}
      <Navigation />
    </div>
  )
}
